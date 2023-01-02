/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        TOKEN: string
        IGUSERNAME: string
        MAINCHANNELID: string
        TESTCHANNELID: string
        FB_ACCESS_TOKEN: string
        FB_ACCESS_TOKEN_KV_GROUPS: string
        OPENAI_TOKEN: string
      }
    }
  }

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}