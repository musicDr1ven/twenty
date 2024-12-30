// packages/twenty-front/vite.config.ts
import { isNonEmptyString } from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/@sniptt/guards/build/index.js";
import react from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/@vitejs/plugin-react-swc/index.mjs";
import wyw from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/@wyw-in-js/vite/esm/index.mjs";
import fs from "fs";
import path from "path";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/vite/dist/node/index.js";
import checker from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/vite-plugin-checker/dist/esm/main.js";
import svgr from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///C:/Users/gabek/Working/Trader%20Project/twenty/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\gabek\\Working\\Trader Project\\twenty\\packages\\twenty-front";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const {
    REACT_APP_SERVER_BASE_URL,
    VITE_BUILD_SOURCEMAP,
    VITE_DISABLE_TYPESCRIPT_CHECKER,
    VITE_DISABLE_ESLINT_CHECKER,
    VITE_HOST,
    SSL_CERT_PATH,
    SSL_KEY_PATH,
    REACT_APP_PORT
  } = env;
  const port = isNonEmptyString(REACT_APP_PORT) ? parseInt(REACT_APP_PORT) : 3001;
  const isBuildCommand = command === "build";
  const tsConfigPath = isBuildCommand ? path.resolve(__vite_injected_original_dirname, "./tsconfig.build.json") : path.resolve(__vite_injected_original_dirname, "./tsconfig.dev.json");
  const checkers = {
    overlay: false
  };
  if (VITE_DISABLE_TYPESCRIPT_CHECKER === "true") {
    console.log(
      `VITE_DISABLE_TYPESCRIPT_CHECKER: ${VITE_DISABLE_TYPESCRIPT_CHECKER}`
    );
  }
  if (VITE_DISABLE_ESLINT_CHECKER === "true") {
    console.log(`VITE_DISABLE_ESLINT_CHECKER: ${VITE_DISABLE_ESLINT_CHECKER}`);
  }
  if (VITE_BUILD_SOURCEMAP === "true") {
    console.log(`VITE_BUILD_SOURCEMAP: ${VITE_BUILD_SOURCEMAP}`);
  }
  if (VITE_DISABLE_TYPESCRIPT_CHECKER !== "true") {
    checkers["typescript"] = {
      tsconfigPath: tsConfigPath
    };
  }
  if (VITE_DISABLE_ESLINT_CHECKER !== "true") {
    checkers["eslint"] = {
      lintCommand: "cd ../.. && eslint packages/twenty-front --report-unused-disable-directives --max-warnings 0 --config .eslintrc.cjs"
    };
  }
  return {
    root: __vite_injected_original_dirname,
    cacheDir: "../../node_modules/.vite/packages/twenty-front",
    server: {
      port,
      ...VITE_HOST ? { host: VITE_HOST } : {},
      ...SSL_KEY_PATH && SSL_CERT_PATH ? {
        protocol: "https",
        https: {
          key: fs.readFileSync(env.SSL_KEY_PATH),
          cert: fs.readFileSync(env.SSL_CERT_PATH)
        }
      } : {
        protocol: "http"
      },
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          "**/@blocknote/core/src/fonts/**"
        ]
      }
    },
    plugins: [
      react({ jsxImportSource: "@emotion/react" }),
      tsconfigPaths({
        projects: ["tsconfig.json", "../twenty-ui/tsconfig.json"]
      }),
      svgr(),
      checker(checkers),
      // TODO: fix this, we have to restrict the include to only the components that are using linaria
      // Otherwise the build will fail because wyw tries to include emotion styled components
      wyw({
        include: [
          "**/CurrencyDisplay.tsx",
          "**/EllipsisDisplay.tsx",
          "**/ContactLink.tsx",
          "**/BooleanDisplay.tsx",
          "**/LinksDisplay.tsx",
          "**/RoundedLink.tsx",
          "**/OverflowingTextWithTooltip.tsx",
          "**/Chip.tsx",
          "**/Tag.tsx",
          "**/MultiSelectFieldDisplay.tsx",
          "**/RatingInput.tsx",
          "**/RecordTableCellContainer.tsx",
          "**/RecordTableCellDisplayContainer.tsx",
          "**/Avatar.tsx",
          "**/RecordTableBodyDroppable.tsx",
          "**/RecordTableCellBaseContainer.tsx",
          "**/RecordTableCellTd.tsx",
          "**/RecordTableTd.tsx",
          "**/RecordTableHeaderDragDropColumn.tsx",
          "**/ActorDisplay.tsx",
          "**/AvatarChip.tsx"
        ],
        babelOptions: {
          presets: ["@babel/preset-typescript", "@babel/preset-react"]
        }
      })
    ],
    optimizeDeps: {
      exclude: ["../../node_modules/.vite", "../../node_modules/.cache"]
    },
    build: {
      outDir: "build",
      sourcemap: VITE_BUILD_SOURCEMAP === "true"
    },
    envPrefix: "REACT_APP_",
    define: {
      _env_: {
        REACT_APP_SERVER_BASE_URL
      },
      "process.env": {
        REACT_APP_SERVER_BASE_URL
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly"
      }
    },
    resolve: {
      alias: {
        path: "rollup-plugin-node-polyfills/polyfills/path"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvdHdlbnR5LWZyb250L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2FiZWtcXFxcV29ya2luZ1xcXFxUcmFkZXIgUHJvamVjdFxcXFx0d2VudHlcXFxccGFja2FnZXNcXFxcdHdlbnR5LWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnYWJla1xcXFxXb3JraW5nXFxcXFRyYWRlciBQcm9qZWN0XFxcXHR3ZW50eVxcXFxwYWNrYWdlc1xcXFx0d2VudHktZnJvbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dhYmVrL1dvcmtpbmcvVHJhZGVyJTIwUHJvamVjdC90d2VudHkvcGFja2FnZXMvdHdlbnR5LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG5pbXBvcnQgeyBpc05vbkVtcHR5U3RyaW5nIH0gZnJvbSAnQHNuaXB0dC9ndWFyZHMnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuaW1wb3J0IHd5dyBmcm9tICdAd3l3LWluLWpzL3ZpdGUnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBzZWFyY2hGb3JXb3Jrc3BhY2VSb290IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xyXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcblxyXG50eXBlIENoZWNrZXJzID0gUGFyYW1ldGVyczx0eXBlb2YgY2hlY2tlcj5bMF07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIFJFQUNUX0FQUF9TRVJWRVJfQkFTRV9VUkwsXHJcbiAgICBWSVRFX0JVSUxEX1NPVVJDRU1BUCxcclxuICAgIFZJVEVfRElTQUJMRV9UWVBFU0NSSVBUX0NIRUNLRVIsXHJcbiAgICBWSVRFX0RJU0FCTEVfRVNMSU5UX0NIRUNLRVIsXHJcbiAgICBWSVRFX0hPU1QsXHJcbiAgICBTU0xfQ0VSVF9QQVRILFxyXG4gICAgU1NMX0tFWV9QQVRILFxyXG4gICAgUkVBQ1RfQVBQX1BPUlQsXHJcbiAgfSA9IGVudjtcclxuXHJcbiAgY29uc3QgcG9ydCA9IGlzTm9uRW1wdHlTdHJpbmcoUkVBQ1RfQVBQX1BPUlQpXHJcbiAgICA/IHBhcnNlSW50KFJFQUNUX0FQUF9QT1JUKVxyXG4gICAgOiAzMDAxO1xyXG5cclxuICBjb25zdCBpc0J1aWxkQ29tbWFuZCA9IGNvbW1hbmQgPT09ICdidWlsZCc7XHJcblxyXG4gIGNvbnN0IHRzQ29uZmlnUGF0aCA9IGlzQnVpbGRDb21tYW5kXHJcbiAgICA/IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3RzY29uZmlnLmJ1aWxkLmpzb24nKVxyXG4gICAgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi90c2NvbmZpZy5kZXYuanNvbicpO1xyXG5cclxuICBjb25zdCBjaGVja2VyczogQ2hlY2tlcnMgPSB7XHJcbiAgICBvdmVybGF5OiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBpZiAoVklURV9ESVNBQkxFX1RZUEVTQ1JJUFRfQ0hFQ0tFUiA9PT0gJ3RydWUnKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYFZJVEVfRElTQUJMRV9UWVBFU0NSSVBUX0NIRUNLRVI6ICR7VklURV9ESVNBQkxFX1RZUEVTQ1JJUFRfQ0hFQ0tFUn1gLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChWSVRFX0RJU0FCTEVfRVNMSU5UX0NIRUNLRVIgPT09ICd0cnVlJykge1xyXG4gICAgY29uc29sZS5sb2coYFZJVEVfRElTQUJMRV9FU0xJTlRfQ0hFQ0tFUjogJHtWSVRFX0RJU0FCTEVfRVNMSU5UX0NIRUNLRVJ9YCk7XHJcbiAgfVxyXG5cclxuICBpZiAoVklURV9CVUlMRF9TT1VSQ0VNQVAgPT09ICd0cnVlJykge1xyXG4gICAgY29uc29sZS5sb2coYFZJVEVfQlVJTERfU09VUkNFTUFQOiAke1ZJVEVfQlVJTERfU09VUkNFTUFQfWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKFZJVEVfRElTQUJMRV9UWVBFU0NSSVBUX0NIRUNLRVIgIT09ICd0cnVlJykge1xyXG4gICAgY2hlY2tlcnNbJ3R5cGVzY3JpcHQnXSA9IHtcclxuICAgICAgdHNjb25maWdQYXRoOiB0c0NvbmZpZ1BhdGgsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKFZJVEVfRElTQUJMRV9FU0xJTlRfQ0hFQ0tFUiAhPT0gJ3RydWUnKSB7XHJcbiAgICBjaGVja2Vyc1snZXNsaW50J10gPSB7XHJcbiAgICAgIGxpbnRDb21tYW5kOlxyXG4gICAgICAgICdjZCAuLi8uLiAmJiBlc2xpbnQgcGFja2FnZXMvdHdlbnR5LWZyb250IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMCAtLWNvbmZpZyAuZXNsaW50cmMuY2pzJyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcm9vdDogX19kaXJuYW1lLFxyXG4gICAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvcGFja2FnZXMvdHdlbnR5LWZyb250JyxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogcG9ydCxcclxuICAgICAgLi4uKFZJVEVfSE9TVCA/IHsgaG9zdDogVklURV9IT1NUIH0gOiB7fSksXHJcbiAgICAgIC4uLihTU0xfS0VZX1BBVEggJiYgU1NMX0NFUlRfUEFUSFxyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHBzJyxcclxuICAgICAgICAgICAgaHR0cHM6IHtcclxuICAgICAgICAgICAgICBrZXk6IGZzLnJlYWRGaWxlU3luYyhlbnYuU1NMX0tFWV9QQVRIKSxcclxuICAgICAgICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoZW52LlNTTF9DRVJUX1BBVEgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDoge1xyXG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHAnLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgIGZzOiB7XHJcbiAgICAgICAgYWxsb3c6IFtcclxuICAgICAgICAgIHNlYXJjaEZvcldvcmtzcGFjZVJvb3QocHJvY2Vzcy5jd2QoKSksXHJcbiAgICAgICAgICAnKiovQGJsb2Nrbm90ZS9jb3JlL3NyYy9mb250cy8qKicsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCh7IGpzeEltcG9ydFNvdXJjZTogJ0BlbW90aW9uL3JlYWN0JyB9KSxcclxuICAgICAgdHNjb25maWdQYXRocyh7XHJcbiAgICAgICAgcHJvamVjdHM6IFsndHNjb25maWcuanNvbicsICcuLi90d2VudHktdWkvdHNjb25maWcuanNvbiddLFxyXG4gICAgICB9KSxcclxuICAgICAgc3ZncigpLFxyXG4gICAgICBjaGVja2VyKGNoZWNrZXJzKSxcclxuICAgICAgLy8gVE9ETzogZml4IHRoaXMsIHdlIGhhdmUgdG8gcmVzdHJpY3QgdGhlIGluY2x1ZGUgdG8gb25seSB0aGUgY29tcG9uZW50cyB0aGF0IGFyZSB1c2luZyBsaW5hcmlhXHJcbiAgICAgIC8vIE90aGVyd2lzZSB0aGUgYnVpbGQgd2lsbCBmYWlsIGJlY2F1c2Ugd3l3IHRyaWVzIHRvIGluY2x1ZGUgZW1vdGlvbiBzdHlsZWQgY29tcG9uZW50c1xyXG4gICAgICB3eXcoe1xyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICcqKi9DdXJyZW5jeURpc3BsYXkudHN4JyxcclxuICAgICAgICAgICcqKi9FbGxpcHNpc0Rpc3BsYXkudHN4JyxcclxuICAgICAgICAgICcqKi9Db250YWN0TGluay50c3gnLFxyXG4gICAgICAgICAgJyoqL0Jvb2xlYW5EaXNwbGF5LnRzeCcsXHJcbiAgICAgICAgICAnKiovTGlua3NEaXNwbGF5LnRzeCcsXHJcbiAgICAgICAgICAnKiovUm91bmRlZExpbmsudHN4JyxcclxuICAgICAgICAgICcqKi9PdmVyZmxvd2luZ1RleHRXaXRoVG9vbHRpcC50c3gnLFxyXG4gICAgICAgICAgJyoqL0NoaXAudHN4JyxcclxuICAgICAgICAgICcqKi9UYWcudHN4JyxcclxuICAgICAgICAgICcqKi9NdWx0aVNlbGVjdEZpZWxkRGlzcGxheS50c3gnLFxyXG4gICAgICAgICAgJyoqL1JhdGluZ0lucHV0LnRzeCcsXHJcbiAgICAgICAgICAnKiovUmVjb3JkVGFibGVDZWxsQ29udGFpbmVyLnRzeCcsXHJcbiAgICAgICAgICAnKiovUmVjb3JkVGFibGVDZWxsRGlzcGxheUNvbnRhaW5lci50c3gnLFxyXG4gICAgICAgICAgJyoqL0F2YXRhci50c3gnLFxyXG4gICAgICAgICAgJyoqL1JlY29yZFRhYmxlQm9keURyb3BwYWJsZS50c3gnLFxyXG4gICAgICAgICAgJyoqL1JlY29yZFRhYmxlQ2VsbEJhc2VDb250YWluZXIudHN4JyxcclxuICAgICAgICAgICcqKi9SZWNvcmRUYWJsZUNlbGxUZC50c3gnLFxyXG4gICAgICAgICAgJyoqL1JlY29yZFRhYmxlVGQudHN4JyxcclxuICAgICAgICAgICcqKi9SZWNvcmRUYWJsZUhlYWRlckRyYWdEcm9wQ29sdW1uLnRzeCcsXHJcbiAgICAgICAgICAnKiovQWN0b3JEaXNwbGF5LnRzeCcsXHJcbiAgICAgICAgICAnKiovQXZhdGFyQ2hpcC50c3gnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYmFiZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICBwcmVzZXRzOiBbJ0BiYWJlbC9wcmVzZXQtdHlwZXNjcmlwdCcsICdAYmFiZWwvcHJlc2V0LXJlYWN0J10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG5cclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBleGNsdWRlOiBbJy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZScsICcuLi8uLi9ub2RlX21vZHVsZXMvLmNhY2hlJ10sXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcclxuICAgICAgc291cmNlbWFwOiBWSVRFX0JVSUxEX1NPVVJDRU1BUCA9PT0gJ3RydWUnLFxyXG4gICAgfSxcclxuXHJcbiAgICBlbnZQcmVmaXg6ICdSRUFDVF9BUFBfJyxcclxuXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgX2Vudl86IHtcclxuICAgICAgICBSRUFDVF9BUFBfU0VSVkVSX0JBU0VfVVJMLFxyXG4gICAgICB9LFxyXG4gICAgICAncHJvY2Vzcy5lbnYnOiB7XHJcbiAgICAgICAgUkVBQ1RfQVBQX1NFUlZFUl9CQVNFX1VSTCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgbW9kdWxlczoge1xyXG4gICAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2VPbmx5JyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgcGF0aDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3BhdGgnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsY0FBYyxTQUFTLDhCQUE4QjtBQUM5RCxPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBVDFCLElBQU0sbUNBQW1DO0FBYXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSTtBQUVKLFFBQU0sT0FBTyxpQkFBaUIsY0FBYyxJQUN4QyxTQUFTLGNBQWMsSUFDdkI7QUFFSixRQUFNLGlCQUFpQixZQUFZO0FBRW5DLFFBQU0sZUFBZSxpQkFDakIsS0FBSyxRQUFRLGtDQUFXLHVCQUF1QixJQUMvQyxLQUFLLFFBQVEsa0NBQVcscUJBQXFCO0FBRWpELFFBQU0sV0FBcUI7QUFBQSxJQUN6QixTQUFTO0FBQUEsRUFDWDtBQUVBLE1BQUksb0NBQW9DLFFBQVE7QUFDOUMsWUFBUTtBQUFBLE1BQ04sb0NBQW9DLCtCQUErQjtBQUFBLElBQ3JFO0FBQUEsRUFDRjtBQUVBLE1BQUksZ0NBQWdDLFFBQVE7QUFDMUMsWUFBUSxJQUFJLGdDQUFnQywyQkFBMkIsRUFBRTtBQUFBLEVBQzNFO0FBRUEsTUFBSSx5QkFBeUIsUUFBUTtBQUNuQyxZQUFRLElBQUkseUJBQXlCLG9CQUFvQixFQUFFO0FBQUEsRUFDN0Q7QUFFQSxNQUFJLG9DQUFvQyxRQUFRO0FBQzlDLGFBQVMsWUFBWSxJQUFJO0FBQUEsTUFDdkIsY0FBYztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUVBLE1BQUksZ0NBQWdDLFFBQVE7QUFDMUMsYUFBUyxRQUFRLElBQUk7QUFBQSxNQUNuQixhQUNFO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFFVixRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0EsR0FBSSxZQUFZLEVBQUUsTUFBTSxVQUFVLElBQUksQ0FBQztBQUFBLE1BQ3ZDLEdBQUksZ0JBQWdCLGdCQUNoQjtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFVBQ0wsS0FBSyxHQUFHLGFBQWEsSUFBSSxZQUFZO0FBQUEsVUFDckMsTUFBTSxHQUFHLGFBQWEsSUFBSSxhQUFhO0FBQUEsUUFDekM7QUFBQSxNQUNGLElBQ0E7QUFBQSxRQUNFLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDSixJQUFJO0FBQUEsUUFDRixPQUFPO0FBQUEsVUFDTCx1QkFBdUIsUUFBUSxJQUFJLENBQUM7QUFBQSxVQUNwQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsTUFBTSxFQUFFLGlCQUFpQixpQkFBaUIsQ0FBQztBQUFBLE1BQzNDLGNBQWM7QUFBQSxRQUNaLFVBQVUsQ0FBQyxpQkFBaUIsNEJBQTRCO0FBQUEsTUFDMUQsQ0FBQztBQUFBLE1BQ0QsS0FBSztBQUFBLE1BQ0wsUUFBUSxRQUFRO0FBQUE7QUFBQTtBQUFBLE1BR2hCLElBQUk7QUFBQSxRQUNGLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDWixTQUFTLENBQUMsNEJBQTRCLHFCQUFxQjtBQUFBLFFBQzdEO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBRUEsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLDRCQUE0QiwyQkFBMkI7QUFBQSxJQUNuRTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVyx5QkFBeUI7QUFBQSxJQUN0QztBQUFBLElBRUEsV0FBVztBQUFBLElBRVgsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxNQUNGO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
