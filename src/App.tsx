/* eslint-disable react/no-danger */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { marked } from 'marked';

import { Theme } from '@/store/enums';
import { setTheme as setThemeAction } from '@/store/actions/config';

import { PitchDisplay } from '@/components/PitchDisplay';
import { Dialog, DialogContent, DialogActions } from '@/components/Dialog';
import { List, ItemButton } from '@/components/List';
import { Button } from '@/components/Button';
import useAudio from '@/hooks/useAudio';
import render2D from '@/utils/render2D';

import usePitch, { NoteResult } from '@/hooks/usePitch';
import { Microphone as IconMicrophone } from '@/components/icons/Microphone';
import { MicrophoneMute as IconMicrophoneMute } from '@/components/icons/MicrophoneMute';
import { Info as IconInfo } from '@/components/icons/Info';
import { Github as IconGithub } from '@/components/icons/Github';
import { Sun as IconSun } from '@/components/icons/Sun';
import { Moon as IconMoon } from '@/components/icons/Moon';
import Ellipsis from '@/components/loader/Ellipsis';
import useTheme from '@/hooks/useTheme';

import '@/app.scss';

export const connector = connect(
  (state: Store.ReducerRoot) => ({
    config: state.config,
  }),
  (dispatch) => ({
    setTheme: (theme: Theme) => dispatch(setThemeAction(theme)),
  }),
);

type AppProps = ConnectedProps<typeof connector>;

function App(props: AppProps) {
  const { config, setTheme } = props;
  const { t } = useTranslation();
  const [dialogPermissions, setDialogPermissions] = useState<boolean>(true);
  const [dialogDenied, setDialogDenied] = useState<boolean>(false);
  const [dialogAbout, setDialogAbout] = useState<boolean>(false);
  const [waitingPermissions, setWaitingPermissions] = useState<boolean>(false);
  const [dialogMic, setDialogMic] = useState<boolean>(false);
  const [dialogError, setDialogError] = useState<boolean>(false);
  const [devicesMic, setDevicesMic] = useState<MediaDeviceInfo[]>([]);
  const pitch = usePitch();
  const { layout } = useTheme(config.theme);
  const {
    createStream, getDevices, getByteTimeDomain, getFloatTimeDomain,
    destroyStream, resume, deviceSettings, sampleRate, microphoneName,
  } = useAudio();

  const [render] = useState(render2D({
    bufferLength: 1024,
    text: {
      align: 'center',
      font: 'bold 120px roboto',
      value: 'E₇',
      color: '#000',
    },
    wave: {
      color: '#E5E5E5',
      width: 6,
    },
    background: layout.backgroud,
  }));

  const initialize = useCallback((audio: boolean | MediaTrackConstraints = true) => {
    createStream({ audio })
      .then(() => {
        let hertz: number;
        let noteResult: NoteResult;

        render.requestFrame(() => {
          render.setBuffer(getByteTimeDomain(1024));
          hertz = pitch.detect(getFloatTimeDomain(2048), sampleRate);
          noteResult = pitch.getNote(hertz);
          if (noteResult.accuracy < 2) render.setTextColor(layout.note.match);
          else render.setTextColor(undefined);

          render.setText(noteResult.note.name);
          render.setHertz(hertz.toFixed(2));
        });
      })
      .catch(() => {
        setDialogError(true);
      });
  }, [createStream, getByteTimeDomain, render, sampleRate, getFloatTimeDomain, pitch, layout]);

  useEffect(() => {
    render.setTheme({
      background: layout.backgroud,
      wave: {
        color: layout.wave,
        width: 6,
      },
      text: {
        align: 'center',
        font: 'bold 120px roboto',
        value: 'E₇',
        color: layout.text,
      },
    });
  }, [layout, render]);

  const changeMicrophone = useCallback((deviceId: string) => {
    setDialogMic(false);
    destroyStream();
    initialize({ deviceId });
  }, [destroyStream, initialize]);

  const canvasLoaded = useCallback((canvas: HTMLCanvasElement) => {
    render.setCanvas(canvas);
    render.draw();
  }, [render]);

  const getMicrophonesAvailable = useCallback(() => {
    getDevices('audioinput')
      .then((devices: MediaDeviceInfo[]) => {
        setDevicesMic(devices);
      })
      .catch(() => {
        setDialogError(true);
      });
  }, [getDevices]);

  const getCurrentMicName = () => {
    const device = devicesMic.find(({ deviceId }) => deviceId === deviceSettings.deviceId);
    return device ? microphoneName(device) : '';
  };

  const getPermissions = useCallback(() => {
    const { mediaDevices } = navigator;
    setWaitingPermissions(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    resume();

    mediaDevices.getUserMedia({ audio: true })
      .then(() => getMicrophonesAvailable())
      .then(() => {
        setDialogMic(true);
        setDialogPermissions(false);
      })
      .catch((error: Error) => {
        if (error.message !== 'Permission dismissed') {
          setDialogPermissions(false);
          setDialogDenied(true);
        }
      })
      .finally(() => {
        setWaitingPermissions(false);
      });
  }, [getMicrophonesAvailable, resume]);

  const getHelpPermissions = useCallback(() => {
    if (/chrom/i.test(navigator.userAgent)) {
      window.open('https://support.google.com/chrome/answer/114662?hl=en&co=GENIE.Platform%3DDesktop&oco=1', '_blank');
      return;
    }
    if (/firefox/i.test(navigator.userAgent)) {
      window.open('https://support.mozilla.org/en-US/kb/site-permissions-panel', '_blank');
      return;
    }

    window.open('https://www.google.com/search?q=how+to+reset+permission+browser', '_blank');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDialogAbout(true);
    }, 1000 * 60 * 2);
  }, []);

  return (
    <div className="relative flex items-center h-screen" style={{ backgroundColor: layout.backgroud, color: layout.text }}>
      <div>
        <PitchDisplay onLoaded={canvasLoaded} style={{ width: '100vw', height: '30vh' }} />
        <div className="flex flex-col items-center mt-24">
          <Button ariaLabel="Microphones" type="button" icon color={layout.buttons.okay.color} onClick={() => setDialogMic((sta) => !sta)}>
            <IconMicrophone />
          </Button>
          <div className="mt-4">
            <p>
              {getCurrentMicName()}
            </p>
          </div>
        </div>
      </div>
      <Dialog title={t('dialog.microphones.title')} open={dialogMic} style={{ backgroundColor: layout.backgroud, color: layout.text }}>
        <DialogContent>
          <List>
            {devicesMic.map((microphone: MediaDeviceInfo) => (
              <ItemButton
                key={microphone.deviceId}
                onClick={() => changeMicrophone(microphone.deviceId)}
                active={microphone.deviceId === deviceSettings.deviceId}
              >
                <span className="text-sm">
                  {microphoneName(microphone)}
                </span>
              </ItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <Dialog title={t('dialog.permissions.title')} open={dialogPermissions} style={{ backgroundColor: layout.backgroud, color: layout.text }}>
        <DialogContent>
          <p>
            {t('dialog.permissions.text')}
          </p>
          <div className="flex justify-center mt-4">
            <IconMicrophone color={layout.text} />
          </div>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button disabled={waitingPermissions} type="button" color={layout.buttons.okay.color} colorText={layout.buttons.okay.textColor} onClick={getPermissions}>
            {waitingPermissions ? <Ellipsis /> : t('buttons.okay')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title={t('dialog.denied.title')} open={dialogDenied} style={{ backgroundColor: layout.backgroud, color: layout.text }}>
        <DialogContent>
          <p>
            {t('dialog.denied.text')}
          </p>
          <div className="flex justify-center mt-4">
            <IconMicrophoneMute color={layout.text} />
          </div>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color={layout.buttons.okay.color} colorText={layout.buttons.okay.textColor} onClick={getHelpPermissions}>
            {t('buttons.get-help')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title={t('dialog.error.title')} open={dialogError} style={{ backgroundColor: layout.backgroud, color: layout.text }}>
        <DialogContent>
          <p>
            {t('dialog.error.text')}
          </p>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color={layout.buttons.okay.color} colorText={layout.buttons.okay.textColor} onClick={() => window.location.reload()}>
            {t('buttons.exit')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title={t('dialog.about.title')} open={dialogAbout} style={{ backgroundColor: layout.backgroud, color: layout.text }}>
        <DialogContent>
          <div className="about" dangerouslySetInnerHTML={{ __html: marked.parse(t('dialog.about.text')) }} />
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color={layout.buttons.okay.color} colorText={layout.buttons.okay.textColor} onClick={() => setDialogAbout(false)}>
            {t('buttons.close')}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="fixed top-4 right-4">
        <Button ariaLabel="Sobre o app" type="button" icon onClick={() => setDialogAbout(true)}>
          <IconInfo color={layout.icon} />
        </Button>
        <Button ariaLabel="Github" type="button" icon onClick={() => window.open('https://github.com/leydev/Tuner', '_blank')}>
          <IconGithub color={layout.icon} />
        </Button>
        {
          config.theme === Theme.LIGHT
            ? (
              <Button ariaLabel="theme mode dark" type="button" icon onClick={() => setTheme(Theme.DARK)}>
                <IconMoon color={layout.icon} />
              </Button>
            ) : (
              <Button ariaLabel="theme mode light" type="button" icon onClick={() => setTheme(Theme.LIGHT)}>
                <IconSun color={layout.icon} />
              </Button>
            )
        }
      </div>
    </div>
  );
}

export default connector(App);
