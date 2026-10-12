import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

type VeliteCompiler = {
  hooks: { beforeCompile: { tapPromise: (name: string, handler: () => Promise<void>) => void } }
  options: { mode?: string }
}

type WebpackConfig = { plugins: unknown[] }

class VeliteWebpackPlugin {
  static started = false
  apply(compiler: VeliteCompiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const { build } = await import('velite')
      await build({ logLevel: 'warn', watch: compiler.options.mode === 'development' })
    })
  }
}

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
