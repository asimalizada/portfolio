import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

class VeliteWebpackPlugin {
  static started = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const { build, watch } = await import('velite') as any
      if (compiler.options.mode === 'development') {
        watch({ logLevel: 'warn' })
      } else {
        await build({ logLevel: 'warn' })
      }
    })
  }
}

const nextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack(config: any) {
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
