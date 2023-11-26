import{_ as s,o as a,c as l,V as n}from"./chunks/framework.c3d2f199.js";const o="/assets/image-14.dd681e83.png",p="/assets/image-3.3a9342e3.png",e="/assets/image-2.d37ec0a1.png",t="/assets/image-4.c6d72398.png",c="/assets/image-7.4e2f0b93.png",r="/assets/image-5.c6fc3f53.png",i="/assets/image-6.22089032.png",y="/assets/image-13.d60959dd.png",F="/assets/image-10.e2397094.png",D="/assets/image-11.45c9a5be.png",d="/assets/image-12.028de18d.png",_=JSON.parse('{"title":"网页关键指标优化建议","description":"","frontmatter":{},"headers":[],"relativePath":"blog/notes/页面性能优化.md","filePath":"blog/notes/页面性能优化.md","lastUpdated":1701020816000}'),h={name:"blog/notes/页面性能优化.md"},m=n('<h1 id="网页关键指标优化建议" tabindex="-1">网页关键指标优化建议 <a class="header-anchor" href="#网页关键指标优化建议" aria-label="Permalink to &quot;网页关键指标优化建议&quot;">​</a></h1><blockquote><p>原地址：<a href="https://www.bilibili.com/video/BV1xk4y1w7re/?share_source=copy_web&amp;vd_source=e1b639c86f0cbba65e1ddf0de89f52ec" target="_blank" rel="noreferrer">Web / Chrome｜2023 年核心网页指标九大优化</a></p></blockquote><p><img src="'+o+'" alt="Alt text"></p><h2 id="lcp-largest-contentful-paint-最大内容渲染时间" tabindex="-1">LCP（Largest Contentful Paint） 最大内容渲染时间 <a class="header-anchor" href="#lcp-largest-contentful-paint-最大内容渲染时间" aria-label="Permalink to &quot;LCP（Largest Contentful Paint） 最大内容渲染时间&quot;">​</a></h2><h3 id="什么是-lcp" tabindex="-1">什么是 LCP ？ <a class="header-anchor" href="#什么是-lcp" aria-label="Permalink to &quot;什么是 LCP ？&quot;">​</a></h3><p>视口内可见的最大图片或文本块的呈现时间（相对于网页首次开始加载的时间）</p><p>LCP 是大多数网站都难以达到的指标</p><p><img src="'+p+'" alt="Alt text"></p><p>大多数网站中 LCP 的内容主要是图片</p><p><img src="'+e+`" alt="Alt text"></p><p>由此我们就得到了第一个优化方案</p><h3 id="使用-img-元素或预加载将图像纳入-html-中" tabindex="-1">使用 <code>&lt;img&gt;</code> 元素或预加载将图像纳入 HTML 中 <a class="header-anchor" href="#使用-img-元素或预加载将图像纳入-html-中" aria-label="Permalink to &quot;使用 \`&lt;img&gt;\` 元素或预加载将图像纳入 HTML 中&quot;">​</a></h3><p>需要注意的是，在目前主流的前端框架如 vue 中 <code>&lt;img&gt;</code> 并不能被正确扫描到，因为框架最终会将所有代码编译为 javascript 因此也就不存在 img 标签。</p><p>可以通过 <code>&lt;link rel=&quot;preload&quot; href=&quot;&quot; as=&quot;img&quot;&gt;</code> 来预加载图片，但是我们只有一个 index.html 会一次性预加载所有图片，这样会导致首屏加载时间过长，而有些图片并不会一开始就被看到。</p><p>因此我们需要实现组件级的预加载，当我们需要加载某个组件时，再去预加载该组件的图片（在组件实例化之前就开始加载），这样就可以避免一次性加载所有图片，且还能够提前加载图片。</p><p>组件中的 img 标签和 link 标签都是在组件实例化之后才会被渲染，在实例化之前都是 javascript 代码，而浏览器是无法扫描 javascript 中的资源的，因此我们需要手动告知浏览器需要加载的资源有哪些。</p><p>通过 <code>new Image().src = &#39;&#39;</code> 可以立即触发图片的加载，相当于 <code>document.createElement(&#39;img&#39;)</code>(img 标签中有一个属性 loading，用于指示浏览器如何加载图像，默认值为 eager 表示立即加载)</p><p>我们只需要在路由切换之前执行 <code>new Image().src = &#39;&#39;</code> 即可，这样就可以在组件实例化之前就开始加载图片了，而不是等到组件实例化之后再去加载图片。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/** 路由守卫 */</span></span>
<span class="line"><span style="color:#BABED8;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">beforeEach</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">to</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">from</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">preloadImages</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">to</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">meta</span><span style="color:#89DDFF;">?.</span><span style="color:#BABED8;">preloadImages</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#F07178;">[]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 图片预加载</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">description</span><span style="color:#676E95;font-style:italic;"> 越过 js 代码分析，提前触发浏览器的图片加载机制</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - chrome 中存在问题，当网络环境差时，开启高速 3G 节流模式时（或更慢），图片会加载两次，原因不详，尝试 corsOrigin、referrerPolicy 无果，疑似缓存未命中（缓存 key 组成不一致）或被清空</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 停用节流模式时，预加载缓存正常命中，只加载一次图片。（ps: 这个节流模式 bug 真多）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - firefox 中不存在该问题，正常预加载一次图片，后续会正确显示命中缓存</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 其他浏览器未测试</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">preloadImages</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">preloadImages</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">item</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">img</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Image</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">img</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">item</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// img.referrerPolicy = &quot;no-referrer&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// img.crossOrigin = &quot;anonymous&quot;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>可以借助 <code>onload</code> 事件实现顺序加载</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> preloadImages </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> []</span></span>
<span class="line"><span style="color:#BABED8;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">beforeEach</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">loadImg</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">i</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">img</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Image</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">img</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">preloadImages</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">img</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onload</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">loadImg</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">i</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><h3 id="fetch-priority-api" tabindex="-1">Fetch Priority API <a class="header-anchor" href="#fetch-priority-api" aria-label="Permalink to &quot;Fetch Priority API&quot;">​</a></h3><p>浏览器倾向于先渲染 css 和同步 javascript 等这些会阻塞其他内容加载的内容而非图像，使用 Fetch Priority API 可以告诉浏览器哪些资源是优先级较高的，从而优先加载这些资源。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">myUrl.jgp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">fetchpriority</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">high</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">myUrl.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">as</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">fetchpriority</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">high</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>当 <code>fetchpriority</code> 设为 <code>low</code> 时可以实现与 <code>lazy</code> 相似的效果，当需要文件时才会获取</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">loading</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lazy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">fetchpriority</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lazy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><h3 id="使用-cdn-优化第一字节时间-ttfb" tabindex="-1">使用 CDN 优化第一字节时间（TTFB） <a class="header-anchor" href="#使用-cdn-优化第一字节时间-ttfb" aria-label="Permalink to &quot;使用 CDN 优化第一字节时间（TTFB）&quot;">​</a></h3><p>CDN （内容分发网络）的优点：</p><ul><li>就近访问</li><li>负载均衡</li><li>缓存</li><li>内容压缩</li><li>防 DDOS 攻击</li></ul><p>就近访问和缓存都是优化第一字节时间的关键，就近访问可以减少网络延迟，缓存可以减少服务器的响应时间。</p><h2 id="cls-cumulative-layout-shift-累计布局偏移" tabindex="-1">CLS（Cumulative Layout Shift）累计布局偏移 <a class="header-anchor" href="#cls-cumulative-layout-shift-累计布局偏移" aria-label="Permalink to &quot;CLS（Cumulative Layout Shift）累计布局偏移&quot;">​</a></h2><h3 id="显示定义元素的尺寸" tabindex="-1">显示定义元素的尺寸 <a class="header-anchor" href="#显示定义元素的尺寸" aria-label="Permalink to &quot;显示定义元素的尺寸&quot;">​</a></h3><p>显示定义元素的尺寸，浏览器初步渲染时就能以正确的尺寸渲染</p><p>最基本的便是指定元素宽高</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">width</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">400</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">height</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">300</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>其次我们还可以使用 css 的 <code>aspect-ratio</code> 属性来指定宽高比，这样</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">video</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">100%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> auto</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  aspect-ratio</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">16</span><span style="color:#BABED8;"> / </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>此外还可以使用 <code>min-height</code> 为动态内容预留最小空间，减少对 CLS 的影响</p><p><img src="`+t+'" alt="Alt text"></p><h3 id="bfcache-缓存" tabindex="-1">bfcache 缓存 <a class="header-anchor" href="#bfcache-缓存" aria-label="Permalink to &quot;bfcache 缓存&quot;">​</a></h3><p>bfcache 是浏览器的一个缓存机制，当用户点击浏览器的后退按钮时，浏览器会从缓存中恢复页面，而不是重新加载页面。</p><p>bfcache 会在用户离开页面时将完全渲染的页面的完整快照短时间存储在内存中。</p><p>bfcache 默认是开启的，但是有些 API 会导致 bfcache 失效，可以通过 DevTools 的 application 面板查看当前页面是否被缓存。</p><p><img src="'+c+'" alt="Alt text"></p><p>最常见的原因是 <code>cache-control</code> 的值为 <code>no-store</code>，这会禁用 bfcache，或者在使用 <code>unload</code> 事件，这也会禁用 bfcache。</p><p>还可以使用 NotRestoreReasons API 来查看页面为什么没有被缓存</p><blockquote><p>PS：没找到 API 文档</p></blockquote><h3 id="关于动画" tabindex="-1">关于动画 <a class="header-anchor" href="#关于动画" aria-label="Permalink to &quot;关于动画&quot;">​</a></h3><p><img src="'+r+'" alt="Alt text"></p><p>使用 <code>top</code> 等属性会导致页面重排，即使他不会影响周围元素也会算入 CLS 中，因此我们应该尽量使用 <code>transform</code> 来实现动画。</p><p><img src="'+i+'" alt="Alt text"></p><p><code>transform</code> 发生在合成层不会影响布局处理中的任何内容，也就不会算入 CLS 中。</p><h2 id="fid-first-input-delay-首次输入延迟" tabindex="-1">FID（First Input Delay）首次输入延迟 <a class="header-anchor" href="#fid-first-input-delay-首次输入延迟" aria-label="Permalink to &quot;FID（First Input Delay）首次输入延迟&quot;">​</a></h2><p>这些优化也有利于更新的指标 INP （Interaction to Next Paint）下次绘制交互</p><p>响应能力的关键在于确保不阻塞主线程</p><h3 id="识别和消除长任务" tabindex="-1">识别和消除长任务 <a class="header-anchor" href="#识别和消除长任务" aria-label="Permalink to &quot;识别和消除长任务&quot;">​</a></h3><p>chrome 将长任务定义为超过 50ms 的任务</p><p>javascript 本质上是单线程且贪婪的，一旦占据主线程就会一直执行，直到一个内容出现中断</p><p>可以使用 <code>setTimeout</code> 将非关键的任务延迟执行</p><p>还有一些实验性的 API</p><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduling/isInputPending" target="_blank" rel="noreferrer">isInputPending()</a> : 判断是否有输入事件在等待处理 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask" target="_blank" rel="noreferrer">scheduler.postTask()</a> : 可以给一个任务指定优先级 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield" target="_blank" rel="noreferrer">scheduler.yield()</a> : 允许 javascript 让步（yield）主线程给优先级更高的任务，但不会让步给同优先级的任务</p><h3 id="避免不必要的-javascript" tabindex="-1">避免不必要的 JavaScript <a class="header-anchor" href="#避免不必要的-javascript" aria-label="Permalink to &quot;避免不必要的 JavaScript&quot;">​</a></h3><p>可以使用 chrome 的 coverage（覆盖率）工具来识别不必要的 javascript 代码，通过拆分的方式来减少一次性加载的 javascript 的体积，在空闲时间加载剩余的 javascript。</p><p><img src="'+y+'" alt="Alt text"><img src="'+F+'" alt="Alt text"></p><h3 id="避免大的渲染更新" tabindex="-1">避免大的渲染更新 <a class="header-anchor" href="#避免大的渲染更新" aria-label="Permalink to &quot;避免大的渲染更新&quot;">​</a></h3><ul><li>避免大范围的更新 dom</li></ul><p>不管是有用的更新还是级联效应，都会导致主线程被阻塞，从而影响用户的交互体验。</p><p>可以通过缩小 dom 的 size 来减少 dom 更新的范围</p><p>lighthouse 面板会有相关的检查</p><p><img src="'+D+'" alt="Alt text"></p><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain" target="_blank" rel="noreferrer">css contain</a> 属性可以限制 css 的影响范围不受外部影响，从而减少布局工作</li></ul><p><img src="'+d+'" alt="Alt text"></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/content-visibility" target="_blank" rel="noreferrer">content-visibility</a> 是 css <code>contain</code> 的延伸，跳过不可见元素的布局和绘制（仅 chromium 支持）</p><h3 id="避免使用-requestanimationframe-api" tabindex="-1">避免使用 requestAnimationFrame API <a class="header-anchor" href="#避免使用-requestanimationframe-api" aria-label="Permalink to &quot;避免使用 requestAnimationFrame API&quot;">​</a></h3><p>这个 API 应该只用于渲染工作，如果安排了太多任务它会减慢自己的速度。</p><h2 id="扩展阅读" tabindex="-1">扩展阅读 <a class="header-anchor" href="#扩展阅读" aria-label="Permalink to &quot;扩展阅读&quot;">​</a></h2><ul><li><p><a href="https://web.dev/articles/optimize-long-tasks?hl=zh-cn" target="_blank" rel="noreferrer">优化耗时较长的任务</a></p></li><li><p><a href="https://web.dev/articles/preload-optional-fonts?utm_source=lighthouse&amp;utm_medium=devtools&amp;hl=zh-cn" target="_blank" rel="noreferrer">通过预加载可选字体来防止布局偏移和不可见文本 (FOIT) 闪烁</a></p></li><li><p><a href="https://web.dev/articles/vitals?hl=zh-cn" target="_blank" rel="noreferrer">核心网页指标（core web vitals） 集合</a></p></li></ul>',77),u=[m];function g(f,A,E,B,C,b){return a(),l("div",null,u)}const P=s(h,[["render",g]]);export{_ as __pageData,P as default};
