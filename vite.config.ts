import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function browserConsoleLogger(): Plugin {
  const endpoint = '/__browser-console-log';

  return {
    name: 'browser-console-logger',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(endpoint, (req: any, res: any, next: any) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let body = '';
        req.setEncoding('utf8');
        req.on('data', (chunk: string) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const payload = JSON.parse(body);
            const level = String(payload.level ?? 'log').toUpperCase();
            const message = Array.isArray(payload.messages) ? payload.messages.join(' ') : '';
            const stack = payload.stack ? `\n${payload.stack}` : '';
            console.log(`[browser:${level}] ${message}${stack}`);
          } catch (error) {
            console.log('[browser:LOG] Failed to parse browser log payload');
          }

          res.statusCode = 204;
          res.end();
        });
      });
    },
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        `<script>
          (() => {
            const endpoint = '${endpoint}';
            const originalConsole = {};
            const levels = ['log', 'info', 'warn', 'error', 'debug'];
            const redact = (value) => String(value)
              .replace(/eyJ[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+/g, '[redacted-jwt]')
              .replace(/(supabase[^\\s"'=]*[=:]\\s*)[^\\s"']+/gi, '$1[redacted]');
            const serialize = (value, seen = new WeakSet()) => {
              if (value instanceof Error) return value.stack || value.message;
              if (typeof value === 'string') return redact(value);
              if (typeof value !== 'object' || value === null) return redact(value);
              if (seen.has(value)) return '[Circular]';
              seen.add(value);
              try {
                return redact(JSON.stringify(value));
              } catch {
                return Object.prototype.toString.call(value);
              }
            };
            const send = (level, args, stack = '') => {
              const payload = JSON.stringify({
                level,
                messages: Array.from(args).map((item) => serialize(item)),
                stack: redact(stack)
              });
              if (navigator.sendBeacon) {
                navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
                return;
              }
              fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true
              }).catch(() => {});
            };

            levels.forEach((level) => {
              originalConsole[level] = console[level].bind(console);
              console[level] = (...args) => {
                originalConsole[level](...args);
                send(level, args);
              };
            });

            window.addEventListener('error', (event) => {
              send('error', [event.message], event.error?.stack || '');
            });
            window.addEventListener('unhandledrejection', (event) => {
              send('error', ['Unhandled promise rejection', event.reason]);
            });
          })();
        </script></head>`
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), browserConsoleLogger()]
});
