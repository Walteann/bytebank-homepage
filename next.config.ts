import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O basePath informa ao Next.js que todas as rotas deste app começam com /store.
  basePath: '/homepage',
  // O assetPrefix é para servir arquivos estáticos (JS, CSS, imagens).
  // Ele será tratado pelo rewrite na aplicação principal (shell).
  assetPrefix: '/homepage',
  output: 'standalone',
};

export default nextConfig;
