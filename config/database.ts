import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  /**
   * Default connection used for all queries.
   */
  connection: 'sqlite',

  connections: {
    /**
     * SQLite connection (default).
     */
    sqlite: {
      client: 'better-sqlite3',

      connection: {
        /**
         * Database file location.
         */
        filename: app.tmpPath('db.sqlite3'),
      },

      /**
       * Required by Knex for SQLite defaults.
       */
      useNullAsDefault: true,

      migrations: {
        /**
         * Sort migration files naturally by filename.
         */
        naturalSort: true,

        /**
         * Paths containing migration files.
         */
        paths: ['database/migrations'],
      },
    },

    /**
     * MySQL / MariaDB connection.
     * Install package to switch: npm install mysql2
     */
    // mysql: {
    //   client: 'mysql2',
    //   connection: {
    //     host: env.get('DB_HOST'),
    //     port: env.get('DB_PORT'),
    //     user: env.get('DB_USER'),
    //     password: env.get('DB_PASSWORD'),
    //     database: env.get('DB_DATABASE'),
    //   },
    //   migrations: {
    //     naturalSort: true,
    //     paths: ['database/migrations'],
    //   },
    //   debug: app.inDev,
    // },
  },
})

export default dbConfig
