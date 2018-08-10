import os from 'os'

// Global function incase we need to change this in the future
export const InstallationDir = () => {
  if(process.env.NODE_ENV !== 'production') return '.'
  return os.homedir();
}

export const cleanPipeName = (str) => {
  if (process.platform === 'win32') {
      str = str.replace(/^\//, '');
      str = str.replace(/\//g, '-');
      return '\\\\.\\pipe\\'+str;
  } else {
      return str;
  }
};