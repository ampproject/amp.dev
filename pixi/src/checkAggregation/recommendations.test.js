import getRecommendationIds from './recommendations';

describe('getRecommendationIds', () => {
  it('returns https', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        usesHttps: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['https']);
  });

  it('returns valid-cached-amp', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        isValid: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['valid-cached-amp']);
  });

  it('returns preload-amp-runtime', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        runtimeIsPreloaded: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['preload-amp-runtime']);
  });

  it('returns preload-render-blocking-extensions', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        blockingExtensionsPreloaded: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['preload-render-blocking-extensions']);
  });

  it('returns preload-web-fonts', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        fontsArePreloaded: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['preload-web-fonts']);
  });

  it('returns fast-font-display', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        fastGoogleFontsDisplay: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['fast-font-display']);
  });

  it('returns preconnect-google-fonts', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        googleFontPreconnect: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['preconnect-google-fonts']);
  });

  it('returns use-amp-optimizer', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        isTransformedAmp: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['use-amp-optimizer']);
  });

  it('returns upgrade-amp-optimizer (module runtime)', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        moduleRuntimeIsUsed: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['upgrade-amp-optimizer']);
  });

  it('returns hero-images', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        heroImageIsDefined: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['hero-images']);
  });

  it('returns amp-boilerplate-removal', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        boilerplateIsRemoved: false,
        updateOptimizerForBoilerplateRemoval: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['amp-boilerplate-removal']);
  });

  it('returns upgrade-amp-optimizer (boilerplate removal)', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        boilerplateIsRemoved: false,
        updateOptimizerForBoilerplateRemoval: true,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['upgrade-amp-optimizer']);
  });

  it('returns prevent-render-blocking-extensions', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        noRenderBlockingExtension: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['prevent-render-blocking-extensions']);
  });

  it('returns dynamic-layout-extensions', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        noDynamicLayoutExtensions: false,
      }),
      Promise.resolve({})
    );
    expect(ids).toEqual(['dynamic-layout-extensions']);
  });

  it('returns safe-browsing', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({
        safeBrowsing: false,
      }),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids).toEqual(['safe-browsing']);
  });

  it('returns mobile-friendly', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        mobileFriendly: false,
      })
    );
    expect(ids).toEqual(['mobile-friendly']);
  });

  it('returns multiple recommendations', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({
        safeBrowsing: false,
      }),
      Promise.resolve({
        usesHttps: false,
        isValid: false,
      }),
      Promise.resolve({
        mobileFriendly: false,
      })
    );
    expect(ids).toContain('safe-browsing');
    expect(ids).toContain('https');
    expect(ids).toContain('valid-cached-amp');
    expect(ids).toContain('mobile-friendly');
  });

  it('returns no recommendations', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({
        safeBrowsing: true,
      }),
      Promise.resolve({
        usesHttps: true,
        isValid: true,
      }),
      Promise.resolve({
        mobileFriendly: true,
      })
    );
    expect(ids).toEqual([]);
  });
});
