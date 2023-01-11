import{_ as e,o as a,c as i,a as c,b as l,w as d,e as r,d as n,r as o}from"./app.9dd76cc4.js";const t={},p=r(`<h1 id="ceph-\u5171\u4EAB\u5B58\u50A8" tabindex="-1"><a class="header-anchor" href="#ceph-\u5171\u4EAB\u5B58\u50A8" aria-hidden="true">#</a> Ceph \u5171\u4EAB\u5B58\u50A8</h1><p>Ceph \u662F\u4E00\u4E2A\u7EDF\u4E00\u7684\u5206\u5E03\u5F0F\u5B58\u50A8\u7CFB\u7EDF\uFF0C\u7531\u4E8E\u5B83\u53EF\u4EE5\u63D0\u4F9B\u8F83\u597D\u7684\u6027\u80FD\u3001\u53EF\u9760\u6027\u548C\u53EF\u6269\u5C55\u6027\uFF0C\u88AB\u5E7F\u6CDB\u7684\u5E94\u7528\u5728\u5B58\u50A8\u9886\u57DF\u3002Ceph \u642D\u5EFA\u9700\u8981 2 \u53F0\u53CA\u4EE5\u4E0A\u7684\u7269\u7406\u673A/\u865A\u62DF\u673A\u5B9E\u73B0\u5B58\u50A8\u5171\u4EAB\u4E0E\u6570\u636E\u5907\u4EFD\uFF0C\u672C\u6559\u7A0B\u4EE5 3 \u53F0\u865A\u62DF\u673A\u673A\u73AF\u5883\u4E3A\u4F8B\uFF0C\u4ECB\u7ECD\u57FA\u4E8E ceph \u5171\u4EAB\u5B58\u50A8\u7684\u5B9E\u4F8B\u6784\u5EFA\u65B9\u6CD5\u3002\u5927\u4F53\u5982\u4E0B\uFF1A</p><ol><li>\u83B7\u53D6\u5728\u540C\u4E00\u7F51\u6BB5\u7684\u865A\u62DF\u673A\u4E09\u53F0\uFF0C\u4E92\u76F8\u4E4B\u95F4\u914D\u7F6E ssh \u514D\u5BC6\u767B\u5F55\uFF0C\u7528\u4F5C ceph \u5BC6\u94A5\u4E0E\u914D\u7F6E\u4FE1\u606F\u7684\u540C\u6B65\uFF1B</li><li>\u5728\u4E3B\u8282\u70B9\u542F\u52A8 mon \u8FDB\u7A0B\uFF0C\u67E5\u770B\u72B6\u6001\uFF0C\u5E76\u590D\u5236\u914D\u7F6E\u6587\u4EF6\u81F3\u5176\u4F59\u5404\u4E2A\u8282\u70B9\uFF0C\u5B8C\u6210 mon \u542F\u52A8\uFF1B</li><li>\u5728\u4E09\u4E2A\u73AF\u5883\u4E2D\u542F\u52A8 osd \u8FDB\u7A0B\u914D\u7F6E\u5B58\u50A8\u76D8\uFF0C\u5E76\u5728\u4E3B\u8282\u70B9\u73AF\u5883\u542F\u52A8 mgr \u8FDB\u7A0B\u3001rgw \u8FDB\u7A0B\uFF1B</li><li>\u521B\u5EFA\u5B58\u50A8\u6C60\u4E0E rbd \u5757\u8BBE\u5907\u955C\u50CF\uFF0C\u5E76\u5BF9\u521B\u5EFA\u597D\u7684\u955C\u50CF\u5728\u5404\u4E2A\u8282\u70B9\u8FDB\u884C\u6620\u5C04\u5373\u53EF\u5B9E\u73B0\u5757\u8BBE\u5907\u7684\u5171\u4EAB\uFF1B</li><li>\u5BF9\u5757\u8BBE\u5907\u8FDB\u884C PolarFS \u7684\u683C\u5F0F\u5316\u4E0E PolarDB \u7684\u90E8\u7F72\u3002</li></ol><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u64CD\u4F5C\u7CFB\u7EDF\u7248\u672C\u8981\u6C42 CentOS 7.5 \u53CA\u4EE5\u4E0A\u3002\u4EE5\u4E0B\u6B65\u9AA4\u5728 CentOS 7.5 \u4E0A\u901A\u8FC7\u6D4B\u8BD5\u3002</p></div><h2 id="\u73AF\u5883\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u51C6\u5907" aria-hidden="true">#</a> \u73AF\u5883\u51C6\u5907</h2><p>\u4F7F\u7528\u7684\u865A\u62DF\u673A\u73AF\u5883\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>IP                  hostname
192.168.1.173       ceph001
192.168.1.174       ceph002
192.168.1.175       ceph003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5-docker" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-docker" aria-hidden="true">#</a> \u5B89\u88C5 docker</h3><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u672C\u6559\u7A0B\u4F7F\u7528\u963F\u91CC\u4E91\u955C\u50CF\u7AD9\u63D0\u4F9B\u7684 docker \u5305\u3002</p></div><h4 id="\u5B89\u88C5-docker-\u4F9D\u8D56\u5305" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-docker-\u4F9D\u8D56\u5305" aria-hidden="true">#</a> \u5B89\u88C5 docker \u4F9D\u8D56\u5305</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> -y yum-utils device-mapper-persistent-data lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5B89\u88C5\u5E76\u542F\u52A8-docker" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u5E76\u542F\u52A8-docker" aria-hidden="true">#</a> \u5B89\u88C5\u5E76\u542F\u52A8 docker</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache
yum <span class="token function">install</span> -y docker-ce

systemctl start <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F" aria-hidden="true">#</a> \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E-ssh-\u514D\u5BC6\u767B\u5F55" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E-ssh-\u514D\u5BC6\u767B\u5F55" aria-hidden="true">#</a> \u914D\u7F6E ssh \u514D\u5BC6\u767B\u5F55</h3><h4 id="\u5BC6\u94A5\u7684\u751F\u6210\u4E0E\u62F7\u8D1D" tabindex="-1"><a class="header-anchor" href="#\u5BC6\u94A5\u7684\u751F\u6210\u4E0E\u62F7\u8D1D" aria-hidden="true">#</a> \u5BC6\u94A5\u7684\u751F\u6210\u4E0E\u62F7\u8D1D</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ssh-keygen
ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph001
ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph002
ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u68C0\u67E5\u662F\u5426\u914D\u7F6E\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u662F\u5426\u914D\u7F6E\u6210\u529F" aria-hidden="true">#</a> \u68C0\u67E5\u662F\u5426\u914D\u7F6E\u6210\u529F</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ssh</span> root@ceph003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4E0B\u8F7D-ceph-daemon" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7D-ceph-daemon" aria-hidden="true">#</a> \u4E0B\u8F7D ceph daemon</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> pull ceph/daemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mon-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#mon-\u90E8\u7F72" aria-hidden="true">#</a> mon \u90E8\u7F72</h2><h3 id="ceph001-\u4E0A-mon-\u8FDB\u7A0B\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#ceph001-\u4E0A-mon-\u8FDB\u7A0B\u542F\u52A8" aria-hidden="true">#</a> ceph001 \u4E0A mon \u8FDB\u7A0B\u542F\u52A8</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -d <span class="token punctuation">\\</span>
    --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">MON_IP</span><span class="token operator">=</span><span class="token number">192.168</span>.1.173 <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CEPH_PUBLIC_NETWORK</span><span class="token operator">=</span><span class="token number">192.168</span>.1.0/24 <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>mon01 <span class="token punctuation">\\</span>
    ceph/daemon mon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u6839\u636E\u5B9E\u9645\u7F51\u7EDC\u73AF\u5883\u4FEE\u6539 IP\u3001\u5B50\u7F51\u63A9\u7801\u4F4D\u6570\u3002</p></div><h3 id="\u67E5\u770B\u5BB9\u5668\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5BB9\u5668\u72B6\u6001" aria-hidden="true">#</a> \u67E5\u770B\u5BB9\u5668\u72B6\u6001</h3><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>$ docker exec mon01 ceph -s
cluster:
    id:     937ccded-3483-4245-9f61-e6ef0dbd85ca
    health: HEALTH_OK

services:
    mon: 1 daemons, quorum ceph001 (age 26m)
    mgr: no daemons active
    osd: 0 osds: 0 up, 0 in

data:
    pools:   0 pools, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 B used, 0 B / 0 B avail
    pgs:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5982\u679C\u9047\u5230 <code>mon is allowing insecure global_id reclaim</code> \u7684\u62A5\u9519\uFF0C\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u89E3\u51B3\u3002</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> mon01 ceph config <span class="token builtin class-name">set</span> mon auth_allow_insecure_global_id_reclaim <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u751F\u6210\u5FC5\u987B\u7684-keyring" tabindex="-1"><a class="header-anchor" href="#\u751F\u6210\u5FC5\u987B\u7684-keyring" aria-hidden="true">#</a> \u751F\u6210\u5FC5\u987B\u7684 keyring</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> mon01 ceph auth get client.bootstrap-osd -o /var/lib/ceph/bootstrap-osd/ceph.keyring
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> mon01 ceph auth get client.bootstrap-rgw -o /var/lib/ceph/bootstrap-rgw/ceph.keyring
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E\u6587\u4EF6\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u540C\u6B65" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u540C\u6B65</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ssh</span> root@ceph002 <span class="token function">mkdir</span> -p /var/lib/ceph
<span class="token function">scp</span> -r /etc/ceph root@ceph002:/etc
<span class="token function">scp</span> -r /var/lib/ceph/bootstrap* root@ceph002:/var/lib/ceph
<span class="token function">ssh</span> root@ceph003 <span class="token function">mkdir</span> -p /var/lib/ceph
<span class="token function">scp</span> -r /etc/ceph root@ceph003:/etc
<span class="token function">scp</span> -r /var/lib/ceph/bootstrap* root@ceph003:/var/lib/ceph
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5728-ceph002-\u4E0E-ceph003-\u4E2D\u542F\u52A8-mon" tabindex="-1"><a class="header-anchor" href="#\u5728-ceph002-\u4E0E-ceph003-\u4E2D\u542F\u52A8-mon" aria-hidden="true">#</a> \u5728 ceph002 \u4E0E ceph003 \u4E2D\u542F\u52A8 mon</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -d <span class="token punctuation">\\</span>
    --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">MON_IP</span><span class="token operator">=</span><span class="token number">192.168</span>.1.174 <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CEPH_PUBLIC_NETWORK</span><span class="token operator">=</span><span class="token number">192.168</span>.1.0/24 <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>mon02 <span class="token punctuation">\\</span>
    ceph/daemon mon

<span class="token function">docker</span> run -d <span class="token punctuation">\\</span>
    --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">MON_IP</span><span class="token operator">=</span><span class="token number">1192.168</span>.1.175 <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CEPH_PUBLIC_NETWORK</span><span class="token operator">=</span><span class="token number">192.168</span>.1.0/24 <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>mon03 <span class="token punctuation">\\</span>
    ceph/daemon mon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u67E5\u770B\u5F53\u524D\u96C6\u7FA4\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5F53\u524D\u96C6\u7FA4\u72B6\u6001" aria-hidden="true">#</a> \u67E5\u770B\u5F53\u524D\u96C6\u7FA4\u72B6\u6001</h3><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>$ docker exec mon01 ceph -s
cluster:
    id:     937ccded-3483-4245-9f61-e6ef0dbd85ca
    health: HEALTH_OK

services:
    mon: 3 daemons, quorum ceph001,ceph002,ceph003 (age 35s)
    mgr: no daemons active
    osd: 0 osds: 0 up, 0 in

data:
    pools:   0 pools, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 B used, 0 B / 0 B avail
    pgs:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u4ECE mon \u8282\u70B9\u4FE1\u606F\u67E5\u770B\u662F\u5426\u6709\u6DFB\u52A0\u5728\u53E6\u5916\u4E24\u4E2A\u8282\u70B9\u521B\u5EFA\u7684 mon \u6DFB\u52A0\u8FDB\u6765\u3002</p></div><h2 id="osd-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#osd-\u90E8\u7F72" aria-hidden="true">#</a> osd \u90E8\u7F72</h2><h3 id="osd-\u51C6\u5907\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#osd-\u51C6\u5907\u9636\u6BB5" aria-hidden="true">#</a> osd \u51C6\u5907\u9636\u6BB5</h3><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u672C\u73AF\u5883\u7684\u865A\u62DF\u673A\u53EA\u6709\u4E00\u4E2A <code>/dev/vdb</code> \u78C1\u76D8\u53EF\u7528\uFF0C\u56E0\u6B64\u4E3A\u6BCF\u4E2A\u865A\u62DF\u673A\u53EA\u521B\u5EFA\u4E86\u4E00\u4E2A osd \u8282\u70B9\u3002</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run --rm --privileged<span class="token operator">=</span>true --net<span class="token operator">=</span>host --ipc<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    -v /run/lock/lvm:/run/lock/lvm:z <span class="token punctuation">\\</span>
    -v /var/run/udev/:/var/run/udev/:z <span class="token punctuation">\\</span>
    -v /dev:/dev -v /etc/ceph:/etc/ceph:z <span class="token punctuation">\\</span>
    -v /run/lvm/:/run/lvm/ <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/:z <span class="token punctuation">\\</span>
    -v /var/log/ceph/:/var/log/ceph/:z <span class="token punctuation">\\</span>
    --entrypoint<span class="token operator">=</span>ceph-volume <span class="token punctuation">\\</span>
    docker.io/ceph/daemon <span class="token punctuation">\\</span>
    --cluster ceph lvm prepare --bluestore --data /dev/vdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u4EE5\u4E0A\u547D\u4EE4\u5728\u4E09\u4E2A\u8282\u70B9\u90FD\u662F\u4E00\u6837\u7684\uFF0C\u53EA\u9700\u8981\u6839\u636E\u78C1\u76D8\u540D\u79F0\u8FDB\u884C\u4FEE\u6539\u8C03\u6574\u5373\u53EF\u3002</p></div><h3 id="osd-\u6FC0\u6D3B\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#osd-\u6FC0\u6D3B\u9636\u6BB5" aria-hidden="true">#</a> osd \u6FC0\u6D3B\u9636\u6BB5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -d --privileged<span class="token operator">=</span>true --net<span class="token operator">=</span>host --pid<span class="token operator">=</span>host --ipc<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    -v /dev:/dev <span class="token punctuation">\\</span>
    -v /etc/localtime:/etc/ localtime:ro <span class="token punctuation">\\</span>
    -v /var/lib/ceph:/var/lib/ceph:z <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph:z <span class="token punctuation">\\</span>
    -v /var/run/ceph:/var/run/ceph:z <span class="token punctuation">\\</span>
    -v /var/run/udev/:/var/run/udev/ <span class="token punctuation">\\</span>
    -v /var/log/ceph:/var/log/ceph:z <span class="token punctuation">\\</span>
    -v /run/lvm/:/run/lvm/ <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CLUSTER</span><span class="token operator">=</span>ceph <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CEPH_DAEMON</span><span class="token operator">=</span>OSD_CEPH_VOLUME_ACTIVATE <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CONTAINER_IMAGE</span><span class="token operator">=</span>docker.io/ceph/daemon <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">OSD_ID</span><span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>ceph-osd-0 <span class="token punctuation">\\</span>
    docker.io/ceph/daemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5404\u4E2A\u8282\u70B9\u9700\u8981\u4FEE\u6539 OSD_ID \u4E0E name \u5C5E\u6027\uFF0COSD_ID \u662F\u4ECE\u7F16\u53F7 0 \u9012\u589E\u7684\uFF0C\u5176\u4F59\u8282\u70B9\u4E3A OSD_ID=1\u3001OSD_ID=2\u3002</p></div><h3 id="\u67E5\u770B\u96C6\u7FA4\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u96C6\u7FA4\u72B6\u6001" aria-hidden="true">#</a> \u67E5\u770B\u96C6\u7FA4\u72B6\u6001</h3><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>$ docker exec mon01 ceph -s
cluster:
    id:     e430d054-dda8-43f1-9cda-c0881b782e17
    health: HEALTH_WARN
            no active mgr

services:
    mon: 3 daemons, quorum ceph001,ceph002,ceph003 (age 44m)
    mgr: no daemons active
    osd: 3 osds: 3 up (since 7m), 3 in (since     13m)

data:
    pools:   0 pools, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 B used, 0 B / 0 B avail
    pgs:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mgr\u3001mds\u3001rgw-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#mgr\u3001mds\u3001rgw-\u90E8\u7F72" aria-hidden="true">#</a> mgr\u3001mds\u3001rgw \u90E8\u7F72</h2><p>\u4EE5\u4E0B\u547D\u4EE4\u5747\u5728 ceph001 \u8FDB\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -d --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>ceph-mgr-0 <span class="token punctuation">\\</span>
    ceph/daemon mgr

<span class="token function">docker</span> run -d --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    -e <span class="token assign-left variable">CEPHFS_CREATE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>ceph-mds-0 <span class="token punctuation">\\</span>
    ceph/daemon mds

<span class="token function">docker</span> run -d --net<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    --privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
    --security-opt <span class="token assign-left variable">seccomp</span><span class="token operator">=</span>unconfined <span class="token punctuation">\\</span>
    -v /var/lib/ceph/:/var/lib/ceph/ <span class="token punctuation">\\</span>
    -v /etc/ceph:/etc/ceph <span class="token punctuation">\\</span>
    --name<span class="token operator">=</span>ceph-rgw-0 <span class="token punctuation">\\</span>
    ceph/daemon rgw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u96C6\u7FA4\u72B6\u6001\uFF1A</p><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>docker exec mon01 ceph -s
cluster:
    id:     e430d054-dda8-43f1-9cda-c0881b782e17
    health: HEALTH_OK

services:
    mon: 3 daemons, quorum ceph001,ceph002,ceph003 (age 92m)
    mgr: ceph001(active, since 25m)
    mds: 1/1 daemons up
    osd: 3 osds: 3 up (since 54m), 3 in (since    60m)
    rgw: 1 daemon active (1 hosts, 1 zones)

data:
    volumes: 1/1 healthy
    pools:   7 pools, 145 pgs
    objects: 243 objects, 7.2 KiB
    usage:   50 MiB used, 2.9 TiB / 2.9 TiB avail
    pgs:     145 active+clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rbd-\u5757\u8BBE\u5907\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#rbd-\u5757\u8BBE\u5907\u521B\u5EFA" aria-hidden="true">#</a> rbd \u5757\u8BBE\u5907\u521B\u5EFA</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u4EE5\u4E0B\u547D\u4EE4\u5747\u5728\u5BB9\u5668 mon01 \u4E2D\u8FDB\u884C\u3002</p></div><h3 id="\u5B58\u50A8\u6C60\u7684\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u5B58\u50A8\u6C60\u7684\u521B\u5EFA" aria-hidden="true">#</a> \u5B58\u50A8\u6C60\u7684\u521B\u5EFA</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it mon01 <span class="token function">bash</span>
ceph osd pool create rbd_polar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521B\u5EFA\u955C\u50CF\u6587\u4EF6\u5E76\u67E5\u770B\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u955C\u50CF\u6587\u4EF6\u5E76\u67E5\u770B\u4FE1\u606F" aria-hidden="true">#</a> \u521B\u5EFA\u955C\u50CF\u6587\u4EF6\u5E76\u67E5\u770B\u4FE1\u606F</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>rbd create --size <span class="token number">512000</span> rbd_polar/image02
rbd info rbd_polar/image02

rbd image <span class="token string">&#39;image02&#39;</span><span class="token builtin class-name">:</span>
size <span class="token number">500</span> GiB <span class="token keyword">in</span> <span class="token number">128000</span> objects
order <span class="token number">22</span> <span class="token punctuation">(</span><span class="token number">4</span> MiB objects<span class="token punctuation">)</span>
snapshot_count: <span class="token number">0</span>
id: 13b97b252c5d
block_name_prefix: rbd_data.13b97b252c5d
format: <span class="token number">2</span>
features: layering, exclusive-lock, object-map, fast-diff, deep-flatten
op_features:
flags:
create_timestamp: Thu Oct <span class="token number">28</span> 06:18:07 <span class="token number">2021</span>
access_timestamp: Thu Oct <span class="token number">28</span> 06:18:07 <span class="token number">2021</span>
modify_timestamp: Thu Oct <span class="token number">28</span> 06:18:07 <span class="token number">2021</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6620\u5C04\u955C\u50CF\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u6620\u5C04\u955C\u50CF\u6587\u4EF6" aria-hidden="true">#</a> \u6620\u5C04\u955C\u50CF\u6587\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>modprobe rbd # \u52A0\u8F7D\u5185\u6838\u6A21\u5757\uFF0C\u5728\u4E3B\u673A\u4E0A\u6267\u884C
rbd map rbd_polar/image02

rbd: sysfs write failed
RBD image feature set mismatch. You can disable features unsupported by the kernel with &quot;rbd feature disable rbd_polar/image02 object-map fast-diff deep-flatten&quot;.
In some cases useful info is found in syslog -  try &quot;dmesg | tail&quot;.
rbd: map failed: (6) No such device or address
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u67D0\u4E9B\u7279\u6027\u5185\u6838\u4E0D\u652F\u6301\uFF0C\u9700\u8981\u5173\u95ED\u624D\u53EF\u4EE5\u6620\u5C04\u6210\u529F\u3002\u5982\u4E0B\u8FDB\u884C\uFF1A\u5173\u95ED rbd \u4E0D\u652F\u6301\u7279\u6027\uFF0C\u91CD\u65B0\u6620\u5C04\u955C\u50CF\uFF0C\u5E76\u67E5\u770B\u6620\u5C04\u5217\u8868\u3002</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>rbd feature disable rbd_polar/image02 object-map fast-diff deep-flatten
rbd map rbd_polar/image02
rbd device list

<span class="token function">id</span>  pool       namespace  image    snap  device
<span class="token number">0</span>   rbd_polar             image01  -     /dev/  rbd0
<span class="token number">1</span>   rbd_polar             image02  -     /dev/  rbd1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6B64\u5904\u6211\u5DF2\u7ECF\u5148\u6620\u5C04\u4E86\u4E00\u4E2A image01\uFF0C\u6240\u4EE5\u6709\u4E24\u6761\u4FE1\u606F\u3002</p></div><h3 id="\u67E5\u770B\u5757\u8BBE\u5907" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5757\u8BBE\u5907" aria-hidden="true">#</a> \u67E5\u770B\u5757\u8BBE\u5907</h3><p>\u56DE\u5230\u5BB9\u5668\u5916\uFF0C\u8FDB\u884C\u64CD\u4F5C\u3002\u67E5\u770B\u7CFB\u7EDF\u4E2D\u7684\u5757\u8BBE\u5907\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>lsblk

NAME                                                               MAJ:MIN RM  SIZE RO TYPE  MOUNTPOINT
vda                                                                253:0    0  500G  0 disk
\u2514\u2500vda1                                                             253:1    0  500G  0 part /
vdb                                                                253:16   0 1000G  0 disk
\u2514\u2500ceph--7eefe77f--c618--4477--a1ed--b4f44520dfc 2-osd--block--bced3ff1--42b9--43e1--8f63--e853b  ce41435
                                                                    252:0    0 1000G  0 lvm
rbd0                                                               251:0    0  100G  0 disk
rbd1                                                               251:16   0  500G  0 disk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5757\u8BBE\u5907\u955C\u50CF\u9700\u8981\u5728\u5404\u4E2A\u8282\u70B9\u90FD\u8FDB\u884C\u6620\u5C04\u624D\u53EF\u4EE5\u5728\u672C\u5730\u73AF\u5883\u4E2D\u901A\u8FC7 <code>lsblk</code> \u547D\u4EE4\u67E5\u770B\u5230\uFF0C\u5426\u5219\u4E0D\u663E\u793A\u3002ceph002 \u4E0E ceph003 \u4E0A\u6620\u5C04\u547D\u4EE4\u4E0E\u4E0A\u8FF0\u4E00\u81F4\u3002</p></div><hr><h2 id="\u51C6\u5907\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#\u51C6\u5907\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDF" aria-hidden="true">#</a> \u51C6\u5907\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDF</h2>`,71),u=n("\u53C2\u9605 "),v=n("\u683C\u5F0F\u5316\u5E76\u6302\u8F7D PFS"),m=n("\u3002");function b(h,k){const s=o("RouterLink");return a(),i("div",null,[p,c("p",null,[u,l(s,{to:"/zh/deploying/fs-pfs.html"},{default:d(()=>[v]),_:1}),m])])}var f=e(t,[["render",b],["__file","storage-ceph.html.vue"]]);export{f as default};
