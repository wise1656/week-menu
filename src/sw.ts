declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

// Кеширование статических ресурсов
precacheAndRoute(self.__WB_MANIFEST);

// Стратегия NetworkFirst для статических ресурсов
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image",
  new NetworkFirst()
);

// Остальные запросы (например, API) не кешируются
registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst()
);

// Активация сервис-воркера
clientsClaim();
