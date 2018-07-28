---
class: post-blog post-detail
type: Blog
$title: "Serverless AMP solution on AWS"
id: serverless-amp-solution-on-aws
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2018/07/11/serverless-amp-solution-on-aws/amp/"
excerpt: "Editor&#8217;s note: The following was originally posted on Medium by Artūrs Krūze, CEO, Magebit. You can see their site featured on the showcase page of AMPproject.org It all started when we realized our website gets outdated very fast and we are always so busy with our customers we forget about ourselves. We had to build something [&#8230;]"
avatar: https://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-07-11T13:09:31-07:00
$date: July 11, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-a6ec8840dd8107f0c4f9cbd7d00cece0{text-align:center;}
---

<div class="amp-wp-article-content">

		<div class="section-inner sectionLayout--insetColumn"><em>Editor’s note: The following was <a href="https://medium.com/magebit/serverless-amp-solution-on-aws-5a4019b68745">originally posted on Medium</a> by Artūrs Krūze, CEO, Magebit. You can see their site featured on the <a href="https://www.ampproject.org/learn/showcases/">showcase page</a> of AMPproject.org</em></div><div></div><div class="section-inner sectionLayout--insetColumn">
<p>It all started when we realized our website gets outdated very fast and we are always so busy with our customers we forget about ourselves. We had to build something amazing.In case you are not familiar with the terms <a class="markup--anchor markup--p-anchor" href="https://serverless.com/" target="_blank" rel="nofollow noopener">serverless</a>, <a class="markup--anchor markup--p-anchor" href="https://www.ampproject.org/" target="_blank" rel="nofollow noopener">AMP</a> and <a class="markup--anchor markup--p-anchor" href="https://aws.amazon.com/" target="_blank" rel="nofollow noopener">AWS</a> — click on the words and learn more.</p>
<h2 id="ced4" class="graf graf--h3 graf-after--p">The technical</h2>
<p>Everybody loves fast pages and most of our visitors are on the go — that is why we selected AMP (Accelerated Mobile Pages). We also wanted to make sure our website can handle unexpected loads, requires minimum infrastructure maintenance and is very fast — so why not go with a serverless infrastructure?</p>
</div><div></div><div class="section-inner sectionLayout--insetColumn"><amp-img class="progressiveMedia-image js-progressiveMedia-image amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/07/82d4c-1swa0awq7io8asf4-uc1ovw.png?w=660" width="660" height="195" sizes="(min-width: 660px) 660px, 100vw"></amp-img></div><div class="section-inner sectionLayout--outsetColumn amp-wp-inline-a6ec8840dd8107f0c4f9cbd7d00cece0">
<figure id="0839" class="graf graf--figure graf--layoutOutsetCenter graf-after--p"><figcaption class="imageCaption">Serverless AMP solution on AWS</figcaption></figure></div><div class="section-inner sectionLayout--insetColumn">
<p>The above is just the infrastructure part. The website still needs to be generated, deployed etc. For that we used what we call the generator.It is a system built on Laravel which is a regular non-serverless site with 1 extra feature — generating the website frontend code. The generator also takes in the standard (non-AMP, non-minified) code and makes it fully AMP and minimized to the limits. In the end we have a fast lightweight site ready to be deployed.The deployments are automated with Jenkins. From generation and file uploads to cache invalidations — all done with a single click.</p>
<h2 id="1952" class="graf graf--h3 graf-after--p">The visual</h2>
<p>Usually, AMP pages are too minimalistic and don’t look good. We stepped in to change that. Our goal was to build a lightweight AMP page that looks good and works amazingly — and we achieved that!</p>
</div><div></div><div class="section-inner sectionLayout--insetColumn"><amp-img class="progressiveMedia-image js-progressiveMedia-image amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/07/d1f27-1lkrkj-_0qsup58ldfkjosq.png?w=660" width="660" height="463" sizes="(min-width: 660px) 660px, 100vw"></amp-img></div><div></div><div class="section-inner sectionLayout--insetColumn">
<p>There were a lot of tricky parts where we understand that with javascript it would be easy but with CSS only it is tough to do. Also, there are different sizing limits (also for CSS) so we had to work hard to keep the styles size tiny. Despite all that we made all the functionality and look as per designs. There was no place where we gave up and went with a simpler solution.</p>
<h2 id="2e93" class="graf graf--h3 graf-after--p">The amazing</h2>
<p>At least that is what Google PageSpeed says about us. The infrastructure is very simple, nearly bullet proof, very easy to maintain and search engines love it. Oh, and it is not just loved by some robots and computers — it is also loved by everybody here at Magebit.</p>
</div><div></div><div class="section-inner sectionLayout--insetColumn"><amp-img class="progressiveMedia-image js-progressiveMedia-image amp-wp-inline-a6ec8840dd8107f0c4f9cbd7d00cece0 amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/07/0c349-1xw_6_eywvgri2q2si7s6aa.png?w=660" width="660" height="319" sizes="(min-width: 660px) 660px, 100vw"></amp-img></div><div></div><div class="section-inner sectionLayout--insetColumn">
<p>It’s a pity that AMP doesn’t allow to host AMP JS file elsewhere or have proper cache headers. This is the only reason we couldn’t reach 100/100 in Google PageSpeed. Changing the AMP JS host to our CDN gives 100 points but throws a console error that the AMP source is not Google’s. Sad, but we’re still happy we reached the maximum possible score with AMP.</p>
<p>Another amazing fact is that the engagement and visibility in Google search grew in a lightning speed after the launch of this AMP website. The <strong class="markup--strong markup--p-strong">average time on site for users doubled</strong> (from ~1 minute to ~2 minutes) and our tracked <strong class="markup--strong markup--p-strong">keyword visibility jumped from 0.5% to 8%</strong> — that’s 16x more than we had without the AMP site.</p>
<h2 id="d5e5" class="graf graf--h3 graf-after--p">We’re ready for new challenges</h2>
<p>Ever wanted to have an awesome website that is lightning fast, easy to maintain and performs amazingly? Great! Let’s get in touch to discuss the details. We will make that happen. Check out the site mentioned in this post — <a class="markup--anchor markup--p-anchor" href="https://magebit.com/" target="_blank" rel="nofollow noopener">magebit.com</a> or just shoot us an email to <a class="markup--anchor markup--p-anchor" href="mailto:info@magebit.com" target="_blank" rel="noopener">info@magebit.com</a>.</p>
</div><div></div><div><em><em>Posted by </em></em><em>Artūrs Krūze, CEO, Magebit</em></div><p> </p>	</div>

	

</div>

