import {cleanCodeForInnerHtml} from './texts';

describe('cleanCodeForInnerHtml', () => {
  it('converts specific html entities', async () => {
    const result = cleanCodeForInnerHtml('&#39; &quot; &amp; &lt; &gt;');
    expect(result.trim()).toEqual('\' " \uFF06 \uFE64 \uFE65');
  });

  it('removes empty span tags', async () => {
    const result = cleanCodeForInnerHtml('<pre><span> </span></pre>');
    expect(result.trim()).toEqual('<pre></pre>');
  });
});
