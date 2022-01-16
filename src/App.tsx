import Logo from '@/assets/logo.png';

import '@/app.css';

function App() {
  return (
    <div>
      <img src={Logo} alt="" />
      <h1 className="text-3xl font-bold underline">Hello React TS</h1>
      <div>
        webpack, babel, typescript
      </div>
    </div>
  );
}

export default App;
