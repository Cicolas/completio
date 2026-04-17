import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, syncDestination, targets, transport } from '@adonisjs/core/logger'
import pino from 'pino'
import pretty from 'pino-pretty'

const LEVEL_COLORS: Record<number, string> = {
  10: '\x1b[90m', // trace - gray
  20: '\x1b[34m', // debug - blue
  30: '\x1b[32m', // info  - green
  40: '\x1b[33m', // warn  - yellow
  50: '\x1b[31m', // error - red
  60: '\x1b[41m\x1b[37m', // fatal - bg red
}
const RESET = '\x1b[0m'

function createPrettyStream() {
  if (process.env.NODE_ENV === 'production') return undefined
  return pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname,context',
    singleLine: false,
    messageFormat: (log, messageKey) => {
      const color = LEVEL_COLORS[log.level as number] ?? ''
      const context = log.context ? `\x1b[33m[${log.context}]${RESET} ` : ''
      const message = log[messageKey]
      const text =
        message === undefined ? `\x1b[90mundefined${RESET}` : `${color}${message}${RESET}`
      return `${context}${text}`
    },
  })
}

const loggerConfig = defineConfig({
  /**
   * Default logger name used by ctx.logger and app logger calls.
   */
  default: 'app',

  loggers: {
    app: {
      /**
       * Toggle this logger on/off.
       */
      enabled: true,

      /**
       * Logger name shown in log records.
       */
      name: env.get('APP_NAME'),

      /**
       * Minimum level to output (trace, debug, info, warn, error, fatal).
       */
      level: env.get('LOG_LEVEL'),

      /**
       * Use sync destination in non-production for immediate flush.
       */
      destination: !app.inProduction ? await syncDestination() : undefined,

      /**
       * Configure where logs are written.
       */
      transport: {
        targets: !app.inProduction ? [targets.pretty()] : [targets.file({ destination: 1 })],
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
