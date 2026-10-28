# Bio 3D

Aplicação React para visualização de modelos 3D de biologia.

## Desenvolvimento

Instale as dependências e inicie o servidor local:

```bash
npm install
npm run dev
```

## Build e deploy

Para gerar o build em `dist` e publicá-lo na branch `gh-pages`:

```bash
npm run deploy
```

O comando executa `npm run build` automaticamente antes de publicar. No GitHub,
configure **Settings > Pages > Build and deployment** para usar a branch
`gh-pages` e a pasta `/ (root)`.
