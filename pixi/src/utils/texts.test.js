import {cleanCodeForInnerHtml, addTargetBlankToLinks} from './texts';

describe('cleanCodeForInnerHtml', () => {
  it('removes empty span tags', async () => {
    const result = cleanCodeForInnerHtml('<pre><span> </span></pre>');
    expect(result.trim()).toEqual('<pre></pre>');
  });
});

describe('addTargetBlankToLinks', () => {
  it('add target blank', async () => {
    expect(addTargetBlankToLinks('<a href="link">')).toEqual(
      '<a target="_blank" href="link">'
    );
    expect(addTargetBlankToLinks('<a href="link#anchor">')).toEqual(
      '<a target="_blank" href="link#anchor">'
    );
    expect(addTargetBlankToLinks('<a class="x" href="link" name="y">')).toEqual(
      '<a target="_blank" class="x" href="link" name="y">'
    );
    expect(
      addTargetBlankToLinks('<a href="l1"></a> <a href="l2"></a>')
    ).toEqual(
      '<a target="_blank" href="l1"></a> <a target="_blank" href="l2"></a>'
    );
  });

  it('do not add target blank', async () => {
    const expectUnchanged = (html) => {
      expect(addTargetBlankToLinks(html)).toEqual(html);
    };
    expectUnchanged('<a>'); // empty tag
    expectUnchanged('<a name="x">'); // no href
    expectUnchanged('<a href="">'); // empty link
    expectUnchanged('<a href="#anchor">'); // only anchor
    expectUnchanged('<a href="link" target="_top">');
    expectUnchanged('<a target="_top" href="link">');
    expectUnchanged('<a target = "_top" href="link">');
    expectUnchanged("<a target='_top' href='link'>");
  });
});
