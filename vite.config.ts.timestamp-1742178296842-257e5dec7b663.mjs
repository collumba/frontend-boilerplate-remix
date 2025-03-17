// vite.config.ts
import { vitePlugin as remix } from "file:///F:/DEVELOP/frontend-boilerplate-remix/node_modules/@remix-run/dev/dist/index.js";
import tailwindcss from "file:///F:/DEVELOP/frontend-boilerplate-remix/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "file:///F:/DEVELOP/frontend-boilerplate-remix/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///F:/DEVELOP/frontend-boilerplate-remix/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      },
      ssr: true
    }),
    tsconfigPaths(),
    tailwindcss()
  ],
  resolve: {
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "test/setup.ts"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxERVZFTE9QXFxcXGZyb250ZW5kLWJvaWxlcnBsYXRlLXJlbWl4XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxERVZFTE9QXFxcXGZyb250ZW5kLWJvaWxlcnBsYXRlLXJlbWl4XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9ERVZFTE9QL2Zyb250ZW5kLWJvaWxlcnBsYXRlLXJlbWl4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcbmRlY2xhcmUgbW9kdWxlIFwiQHJlbWl4LXJ1bi9ub2RlXCIge1xyXG4gIGludGVyZmFjZSBGdXR1cmUge1xyXG4gICAgdjNfc2luZ2xlRmV0Y2g6IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlbWl4KHtcclxuICAgICAgZnV0dXJlOiB7XHJcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXHJcbiAgICAgICAgdjNfcmVsYXRpdmVTcGxhdFBhdGg6IHRydWUsXHJcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcclxuICAgICAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZSxcclxuICAgICAgICB2M19sYXp5Um91dGVEaXNjb3Zlcnk6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNzcjogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgdGFpbHdpbmRjc3MoKSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXHJcbiAgICBkZWR1cGU6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxyXG4gICAgc2V0dXBGaWxlczogW1wiLi90ZXN0L3NldHVwLnRzXCJdLFxyXG4gICAgaW5jbHVkZTogW1wiKiovKi57dGVzdCxzcGVjfS57anMsanN4LHRzLHRzeH1cIl0sXHJcbiAgICBjb3ZlcmFnZToge1xyXG4gICAgICByZXBvcnRlcjogW1widGV4dFwiLCBcImpzb25cIiwgXCJodG1sXCJdLFxyXG4gICAgICBleGNsdWRlOiBbXCJub2RlX21vZHVsZXMvXCIsIFwidGVzdC9zZXR1cC50c1wiXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxjQUFjLGFBQWE7QUFDM1UsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFPMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUEsUUFDaEIsdUJBQXVCO0FBQUEsTUFDekI7QUFBQSxNQUNBLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsRUFDL0I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWSxDQUFDLGlCQUFpQjtBQUFBLElBQzlCLFNBQVMsQ0FBQyxrQ0FBa0M7QUFBQSxJQUM1QyxVQUFVO0FBQUEsTUFDUixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxNQUNqQyxTQUFTLENBQUMsaUJBQWlCLGVBQWU7QUFBQSxJQUM1QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
