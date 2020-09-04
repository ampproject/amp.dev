import getRecommendationIds from './recommendations';

const fixedRecommendations = ['intrusive-interstitials'];

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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('https');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('valid-cached-amp');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('preload-amp-runtime');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('preload-render-blocking-extensions');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('preload-web-fonts');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('fast-font-display');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('preconnect-google-fonts');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('use-amp-optimizer');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('upgrade-amp-optimizer');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('hero-images');
  });

  it('returns amp-boilerplate-removal', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fieldData: {lcp: {data: {category: 'SLOW'}}},
      }),
      Promise.resolve({}),
      Promise.resolve({
        boilerplateIsRemoved: false,
        updateOptimizerForBoilerplateRemoval: false,
      }),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('amp-boilerplate-removal');
  });

  it('returns no amp-boilerplate-removal', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fieldData: {lcp: {data: {category: 'FAST'}}},
      }),
      Promise.resolve({}),
      Promise.resolve({
        boilerplateIsRemoved: false,
        updateOptimizerForBoilerplateRemoval: false,
      }),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length);
    expect(ids).not.toContain('amp-boilerplate-removal');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('upgrade-amp-optimizer');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('prevent-render-blocking-extensions');
  });

  it('returns dynamic-layout-extensions', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fieldData: {cls: {data: {category: 'SLOW'}}},
      }),
      Promise.resolve({}),
      Promise.resolve({
        noDynamicLayoutExtensions: false,
      }),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('dynamic-layout-extensions');
  });

  it('returns no dynamic-layout-extensions', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fieldData: {cls: {data: {category: 'FAST'}}},
      }),
      Promise.resolve({}),
      Promise.resolve({
        noDynamicLayoutExtensions: false,
      }),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length);
    expect(ids).not.toContain('dynamic-layout-extensions');
  });

  it('returns responsive-images', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        usesAppropriatelySizedImages: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('appropriately-sized-images');
  });

  it('returns text-compression', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        textCompression: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('text-compression');
  });

  it('returns server-response-time', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fastServerResponse: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('server-response-time');
  });

  it('returns optimized-images', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        usesOptimizedImages: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('optimized-images');
  });

  it('returns next-gen-images', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        usesWebpImages: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('next-gen-images');
  });

  it('returns fast-font-display', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        fastFontDisplay: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('fast-font-display');
  });

  it('returns minify-css', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        minifiedCss: false,
      }),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({})
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('minify-css');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('safe-browsing');
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
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('mobile-friendly');
  });

  it('returns mobile-friendly', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({}),
      Promise.resolve({
        resourcesLoadable: false,
      })
    );
    expect(ids.length).toBe(fixedRecommendations.length + 1);
    expect(ids).toContain('resource-issues');
  });

  it('returns multiple recommendations', async () => {
    const ids = await getRecommendationIds(
      Promise.resolve({
        usesAppropriatelySizedImages: false,
        minifiedCss: false,
      }),
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
    expect(ids.length).toBe(fixedRecommendations.length + 6);
    expect(ids).toContain('appropriately-sized-images');
    expect(ids).toContain('minify-css');
    expect(ids).toContain('safe-browsing');
    expect(ids).toContain('https');
    expect(ids).toContain('valid-cached-amp');
    expect(ids).toContain('mobile-friendly');
  });

  it('returns fixed recommendations', async () => {
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
    expect(ids.length).toBe(fixedRecommendations.length);
    for (let i = 0; i < fixedRecommendations.length; i++) {
      expect(ids).toContain(fixedRecommendations[i]);
    }
  });
});
