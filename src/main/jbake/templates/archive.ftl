<#assign head_extras>
<link rel="alternate" href="feed.xml" title="MyController Blog - RSS" type="application/rss+xml">
</#assign>
<#assign numberOfBlogPosts = 0 />

    <div class="page-header">
        <h1>MyController.org Blog</h1>
    </div>


<div class="blog-container">

<#if (posts?size > numberOfBlogPosts)>
    <div class="large-4 columns blog-post-listings">
      <ul>
        <#list posts[numberOfBlogPosts..] as post>
          <li>${post.date?string("dd MMMM yyyy")} - <a href="#/${post.uri}"><#escape x as x?xml>${post.title}</#escape></a></li>
        </#list>
        <br/><br/>
    </div>
</#if>

    <a href=feed.xml><i class="fa fa-rss"></i> RSS Feed</a>
</div>
