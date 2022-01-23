/* eslint-disable react/no-danger */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';

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
import Ellipsis from './components/loader/Ellipsis';

import '@/app.scss';

function App() {
  const { t } = useTranslation();
  const [dialogPermissions, setDialogPermissions] = useState<boolean>(false);
  const [dialogDenied, setDialogDenied] = useState<boolean>(false);
  const [dialogAbout, setDialogAbout] = useState<boolean>(true);
  const [waitingPermissions, setWaitingPermissions] = useState<boolean>(false);
  const [dialogMic, setDialogMic] = useState<boolean>(false);
  const [dialogError, setDialogError] = useState<boolean>(false);
  const [devicesMic, setDevicesMic] = useState<MediaDeviceInfo[]>([]);
  const pitch = usePitch();
  const {
    createStream, getDevices, getByteTimeDomain, getFloatTimeDomain,
    destroyStream, resume, deviceSettings, sampleRate, microphoneName,
  } = useAudio();
  const [render] = useState(render2D({
    bufferLength: 1024,
    text: {
      align: 'center',
      font: 'bold 120px Rubik',
      value: 'E₇',
      color: '#000',
    },
    wave: {
      color: '#E5E5E5',
      width: 6,
    },
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
          if (noteResult.accuracy < 2) render.setTextColor('#26e4b7');
          else render.setTextColor('#000');

          render.setText(noteResult.note.name);
          render.setHertz(hertz.toFixed(2));
        });
      })
      .catch(() => {
        setDialogError(true);
      });
  }, [createStream, getByteTimeDomain, render, sampleRate, getFloatTimeDomain, pitch]);

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

  return (
    <div className="relative flex items-center h-screen">
      <div>
        <PitchDisplay onLoaded={canvasLoaded} style={{ width: '100vw', height: '30vh' }} />
        <div className="flex flex-col items-center mt-24">
          <Button type="button" icon color="#26E4B7" onClick={() => setDialogMic((sta) => !sta)}>
            <IconMicrophone />
          </Button>
          <div className="mt-4">
            <p>
              {getCurrentMicName()}
            </p>
          </div>
        </div>
      </div>
      <Dialog title={t('dialog.microphones.title')} open={dialogMic}>
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
      <Dialog title={t('dialog.permissions.title')} open={dialogPermissions}>
        <DialogContent>
          <p>
            {t('dialog.permissions.text')}
          </p>
          <div className="flex justify-center mt-4">
            <IconMicrophone />
          </div>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button disabled={waitingPermissions} type="button" color="#26CDE4" colorText="white" onClick={getPermissions}>
            {waitingPermissions ? <Ellipsis /> : 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title={t('dialog.denied.title')} open={dialogDenied}>
        <DialogContent>
          <p>
            {t('dialog.denied.text')}
          </p>
          <div className="flex justify-center mt-4">
            <IconMicrophoneMute color="#E25A5A" />
          </div>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color="#26CDE4" colorText="white" onClick={getHelpPermissions}>
            Obter ajuda
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title={t('dialog.error.title')} open={dialogError}>
        <DialogContent>
          <p>
            {t('dialog.error.text')}
          </p>
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color="#26CDE4" colorText="white" onClick={() => window.location.reload()}>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog title="Sobre" open={dialogAbout}>
        <DialogContent>
          <div className="about" dangerouslySetInnerHTML={{ __html: marked.parse(t('about')) }} />
        </DialogContent>
        <DialogActions justifyContent="center">
          <Button type="button" color="#26CDE4" colorText="white" onClick={() => setDialogAbout(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <div className="fixed top-4 right-4">
        <Button type="button" icon onClick={() => setDialogAbout(true)}>
          <IconInfo color="#818181" />
        </Button>
      </div>
    </div>
  );
}

export default App;
