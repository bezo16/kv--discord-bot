/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        TOKEN: string | undefined
        IGUSERNAME: string | undefined
        MAINCHANNELID: string | undefined
        TESTCHANNELID: string | undefined
        FILOSOPHYCHANNELID: string | undefined
        ANNOUNCEMENTCHANNELID: string | undefined
        FB_ACCESS_TOKEN: string | undefined
        FB_ACCESS_TOKEN_KV_GROUPS: string | undefined
        OPENAI_TOKEN: string | undefined
      }
    }
  }

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}