import{_ as r,o as c,c as d,a as s,b as a,w as o,d as n,e as t,r as l}from"./app.9dd76cc4.js";const m={},u=s("h1",{id:"\u5B9A\u5236\u5F00\u53D1\u73AF\u5883",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u5B9A\u5236\u5F00\u53D1\u73AF\u5883","aria-hidden":"true"},"#"),n(" \u5B9A\u5236\u5F00\u53D1\u73AF\u5883")],-1),v=s("h2",{id:"\u81EA\u884C\u6784\u5EFA\u5F00\u53D1\u955C\u50CF",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u81EA\u884C\u6784\u5EFA\u5F00\u53D1\u955C\u50CF","aria-hidden":"true"},"#"),n(" \u81EA\u884C\u6784\u5EFA\u5F00\u53D1\u955C\u50CF")],-1),b=n("\u6211\u4EEC\u5728 DockerHub \u4E0A\u63D0\u4F9B\u4E86\u6784\u5EFA\u5B8C\u6BD5\u7684\u955C\u50CF "),k={href:"https://hub.docker.com/r/polardb/polardb_pg_devel/tags",target:"_blank",rel:"noopener noreferrer"},g=s("code",null,"polardb/polardb_pg_devel",-1),h=n(" \u53EF\u4F9B\u76F4\u63A5\u4F7F\u7528\uFF08\u652F\u6301 AMD64 \u548C ARM64 \u67B6\u6784\uFF09\u{1F601}\u3002"),_=t(`<p>\u53E6\u5916\uFF0C\u6211\u4EEC\u4E5F\u63D0\u4F9B\u4E86\u6784\u5EFA\u4E0A\u8FF0\u5F00\u53D1\u955C\u50CF\u7684 Dockerfile\uFF0C\u4ECE CentOS 7 \u5B98\u65B9\u955C\u50CF <code>centos:centos7</code> \u5F00\u59CB\u6784\u5EFA\u51FA\u4E00\u4E2A\u5B89\u88C5\u5B8C\u6240\u6709\u5F00\u53D1\u548C\u8FD0\u884C\u65F6\u4F9D\u8D56\u7684\u955C\u50CF\u3002\u60A8\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u7684\u9700\u8981\u5728 Dockerfile \u4E2D\u6DFB\u52A0\u66F4\u591A\u4F9D\u8D56\u3002\u4EE5\u4E0B\u662F\u624B\u52A8\u6784\u5EFA\u955C\u50CF\u7684 Dockerfile \u53CA\u65B9\u6CD5\u3002</p><details class="custom-container details"><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> centos:centos7</span>

<span class="token instruction"><span class="token keyword">CMD</span> bash</span>

<span class="token comment"># avoid missing locale problem</span>
<span class="token instruction"><span class="token keyword">RUN</span> sed -i <span class="token string">&#39;s/override_install_langs/# &amp;/&#39;</span> /etc/yum.conf</span>

<span class="token comment"># add EPEL and scl source</span>
<span class="token instruction"><span class="token keyword">RUN</span> rpmkeys --import file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7 &amp;&amp; <span class="token operator">\\</span>
    yum install -y epel-release centos-release-scl &amp;&amp; <span class="token operator">\\</span>
    rpmkeys --import file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7 &amp;&amp; <span class="token operator">\\</span>
    rpmkeys --import file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-SIG-SCLo &amp;&amp; <span class="token operator">\\</span>
    yum update -y</span>

<span class="token comment"># GCC and LLVM</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-gdb devtoolset-9-libstdc++-devel devtoolset-9-make &amp;&amp; <span class="token operator">\\</span>
    yum install -y llvm-toolset-7.0-llvm-devel llvm-toolset-7.0-clang-devel llvm-toolset-7.0-cmake</span>

<span class="token comment"># dependencies</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y libicu-devel pam-devel readline-devel libxml2-devel libxslt-devel openldap-devel openldap-clients openldap-servers libuuid-devel xerces-c-devel bison flex gettext tcl-devel python-devel perl-IPC-Run perl-Expect perl-Test-Simple perl-DBD-Pg perl-ExtUtils-Embed perl-ExtUtils-MakeMaker zlib-devel krb5-devel krb5-workstation krb5-server protobuf-devel &amp;&amp; <span class="token operator">\\</span>
    ln /usr/lib64/perl5/CORE/libperl.so /usr/lib64/libperl.so</span>

<span class="token comment"># install basic tools</span>
<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;install basic tools&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    yum install -y <span class="token operator">\\</span>
        git lcov psmisc sudo vim <span class="token operator">\\</span>
        less  <span class="token operator">\\</span>
        net-tools  <span class="token operator">\\</span>
        python2-psycopg2 <span class="token operator">\\</span>
        python2-requests  <span class="token operator">\\</span>
        tar  <span class="token operator">\\</span>
        shadow-utils <span class="token operator">\\</span>
        which  <span class="token operator">\\</span>
        binutils<span class="token operator">\\</span>
        libtool <span class="token operator">\\</span>
        perf  <span class="token operator">\\</span>
        make sudo <span class="token operator">\\</span>
        util-linux</span>

<span class="token comment"># set to empty if GitHub is not barriered</span>
<span class="token comment"># ENV GITHUB_PROXY=https://ghproxy.com/</span>
<span class="token instruction"><span class="token keyword">ENV</span> GITHUB_PROXY=</span>

<span class="token instruction"><span class="token keyword">ENV</span> OPENSSL_VERSION=OpenSSL_1_1_1k</span>

<span class="token comment"># install dependencies from GitHub mirror</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y libaio-devel wget &amp;&amp; <span class="token operator">\\</span>
    cd /usr/local &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># zlog for PFSD</span>
    wget --no-verbose --no-check-certificate <span class="token string">&quot;\${GITHUB_PROXY}https://github.com/HardySimpson/zlog/archive/refs/tags/1.2.14.tar.gz&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># PFSD</span>
    wget --no-verbose --no-check-certificate <span class="token string">&quot;\${GITHUB_PROXY}https://github.com/ApsaraDB/PolarDB-FileSystem/archive/refs/tags/pfsd4pg-release-1.2.41-20211018.tar.gz&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># OpenSSL 1.1.1</span>
    wget --no-verbose --no-check-certificate <span class="token string">&quot;\${GITHUB_PROXY}https://github.com/openssl/openssl/archive/refs/tags/\${OPENSSL_VERSION}.tar.gz&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># enable build tools</span>
    echo <span class="token string">&quot;source /opt/rh/devtoolset-9/enable&quot;</span> &gt;&gt; /etc/bashrc &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;source /opt/rh/llvm-toolset-7.0/enable&quot;</span> &gt;&gt; /etc/bashrc &amp;&amp; <span class="token operator">\\</span>
    source /etc/bashrc &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># unzip and install zlog</span>
    tar -zxf 1.2.14.tar.gz &amp;&amp; <span class="token operator">\\</span>
    cd zlog-1.2.14 &amp;&amp; <span class="token operator">\\</span>
    make &amp;&amp; make install &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&#39;/usr/local/lib&#39;</span> &gt;&gt; /etc/ld.so.conf &amp;&amp; ldconfig &amp;&amp; <span class="token operator">\\</span>
    cd .. &amp;&amp; <span class="token operator">\\</span>
    rm 1.2.14.tar.gz &amp;&amp; <span class="token operator">\\</span>
    rm -rf zlog-1.2.14 &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># unzip and install PFSD</span>
    tar -zxf pfsd4pg-release-1.2.41-20211018.tar.gz &amp;&amp; <span class="token operator">\\</span>
    cd PolarDB-FileSystem-pfsd4pg-release-1.2.41-20211018 &amp;&amp; <span class="token operator">\\</span>
    ./autobuild.sh &amp;&amp; ./install.sh &amp;&amp; <span class="token operator">\\</span>
    cd .. &amp;&amp; <span class="token operator">\\</span>
    rm pfsd4pg-release-1.2.41-20211018.tar.gz &amp;&amp; <span class="token operator">\\</span>
    rm -rf PolarDB-FileSystem-pfsd4pg-release-1.2.41-20211018 &amp;&amp; <span class="token operator">\\</span>
    <span class="token comment"># unzip and install OpenSSL 1.1.1</span>
    tar -zxf <span class="token variable">$OPENSSL_VERSION</span>.tar.gz &amp;&amp; <span class="token operator">\\</span>
    cd /usr/local/openssl-<span class="token variable">$OPENSSL_VERSION</span> &amp;&amp; <span class="token operator">\\</span>
    ./config --prefix=/usr/local/openssl &amp;&amp; make -j64 &amp;&amp; make install &amp;&amp; <span class="token operator">\\</span>
    cp /usr/local/openssl/lib/libcrypto.so.1.1 /usr/lib64/ &amp;&amp; <span class="token operator">\\</span>
    cp /usr/local/openssl/lib/libssl.so.1.1 /usr/lib64/ &amp;&amp; <span class="token operator">\\</span>
    cp -r /usr/local/openssl/include/openssl /usr/include/ &amp;&amp; <span class="token operator">\\</span>
    ln -sf /usr/lib64/libcrypto.so.1.1 /usr/lib64/libcrypto.so &amp;&amp; <span class="token operator">\\</span>
    ln -sf /usr/lib64/libssl.so.1.1 /usr/lib64/libssl.so &amp;&amp; <span class="token operator">\\</span>
    rm -f /usr/local/<span class="token variable">$OPENSSL_VERSION</span>.tar.gz &amp;&amp; <span class="token operator">\\</span>
    rm -rf /usr/local/openssl-<span class="token variable">$OPENSSL_VERSION</span></span>

<span class="token comment"># create default user</span>
<span class="token instruction"><span class="token keyword">ENV</span> USER_NAME=postgres</span>
<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;create default user&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    groupadd -r <span class="token variable">$USER_NAME</span> &amp;&amp; useradd -g <span class="token variable">$USER_NAME</span> <span class="token variable">$USER_NAME</span> -p <span class="token string">&#39;&#39;</span> &amp;&amp; <span class="token operator">\\</span>
    usermod -aG wheel <span class="token variable">$USER_NAME</span></span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /home/<span class="token variable">$USER_NAME</span></span>

<span class="token comment"># modify conf</span>
<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;modify conf&quot;</span> &amp;&amp; <span class="token operator">\\</span>
    mkdir -p /run/pfs &amp;&amp; chown <span class="token variable">$USER_NAME</span> /run/pfs &amp;&amp; <span class="token operator">\\</span>
    mkdir -p /var/log/pfs &amp;&amp; chown <span class="token variable">$USER_NAME</span> /var/log/pfs &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;ulimit -c unlimited&quot;</span> &gt;&gt; /home/postgres/.bashrc &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;export PATH=/home/postgres/tmp_basedir_polardb_pg_1100_bld/bin:\\$PATH&quot;</span> &gt;&gt; /home/postgres/.bashrc &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;alias pg=&#39;psql -h /home/postgres/tmp_master_dir_polardb_pg_1100_bld/&#39;&quot;</span> &gt;&gt; /home/postgres/.bashrc &amp;&amp; <span class="token operator">\\</span>
    rm /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    cp /usr/share/zoneinfo/UTC /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&#39;s/4096/unlimited/g&#39;</span> /etc/security/limits.d/20-nproc.conf &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&#39;s/vim/vi/g&#39;</span> /root/.bashrc</span>

<span class="token instruction"><span class="token keyword">USER</span> <span class="token variable">$USER_NAME</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>\u5C06\u4E0A\u8FF0\u5185\u5BB9\u590D\u5236\u5230\u4E00\u4E2A\u6587\u4EF6\u5185\uFF08\u5047\u8BBE\u6587\u4EF6\u540D\u4E3A <code>Dockerfile-PolarDB</code>\uFF09\u540E\uFF0C\u4F7F\u7528\u5982\u4E0B\u547D\u4EE4\u6784\u5EFA\u955C\u50CF\uFF1A</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u{1F4A1} \u8BF7\u5728\u4E0B\u9762\u7684\u9AD8\u4EAE\u884C\u4E2D\u6309\u9700\u66FF\u6362 <code>&lt;image_name&gt;</code> \u5185\u7684 Docker \u955C\u50CF\u540D\u79F0</p></div><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">docker</span> build --network<span class="token operator">=</span>host <span class="token punctuation">\\</span>
    -t <span class="token operator">&lt;</span>image_name<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
    -f Dockerfile-PolarDB <span class="token builtin class-name">.</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">\xA0</div><br></div></div><h2 id="\u4ECE\u5E72\u51C0\u7684\u7CFB\u7EDF\u5F00\u59CB\u642D\u5EFA\u5F00\u53D1\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#\u4ECE\u5E72\u51C0\u7684\u7CFB\u7EDF\u5F00\u59CB\u642D\u5EFA\u5F00\u53D1\u73AF\u5883" aria-hidden="true">#</a> \u4ECE\u5E72\u51C0\u7684\u7CFB\u7EDF\u5F00\u59CB\u642D\u5EFA\u5F00\u53D1\u73AF\u5883</h2><p>\u8BE5\u65B9\u5F0F\u5047\u8BBE\u60A8\u4ECE\u4E00\u53F0\u5177\u6709 root \u6743\u9650\u7684\u5E72\u51C0\u7684 CentOS 7 \u64CD\u4F5C\u7CFB\u7EDF\u4E0A\u4ECE\u96F6\u5F00\u59CB\uFF0C\u53EF\u4EE5\u662F\uFF1A</p><ul><li>\u5B89\u88C5 CentOS 7 \u7684\u7269\u7406\u673A/\u865A\u62DF\u673A</li><li>\u4ECE CentOS 7 \u5B98\u65B9 Docker \u955C\u50CF <code>centos:centos7</code> \u4E0A\u542F\u52A8\u7684 Docker \u5BB9\u5668</li></ul><h3 id="\u5EFA\u7ACB\u975E-root-\u7528\u6237" tabindex="-1"><a class="header-anchor" href="#\u5EFA\u7ACB\u975E-root-\u7528\u6237" aria-hidden="true">#</a> \u5EFA\u7ACB\u975E root \u7528\u6237</h3><p>PolarDB for PostgreSQL \u9700\u8981\u4EE5\u975E root \u7528\u6237\u8FD0\u884C\u3002\u4EE5\u4E0B\u6B65\u9AA4\u80FD\u591F\u5E2E\u52A9\u60A8\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <code>postgres</code> \u7684\u7528\u6237\u7EC4\u548C\u4E00\u4E2A\u540D\u4E3A <code>postgres</code> \u7684\u7528\u6237\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u5982\u679C\u60A8\u5DF2\u7ECF\u6709\u4E86\u4E00\u4E2A\u975E root \u7528\u6237\uFF0C\u4F46\u540D\u79F0\u4E0D\u662F <code>postgres:postgres</code>\uFF0C\u53EF\u4EE5\u5FFD\u7565\u8BE5\u6B65\u9AA4\uFF1B\u4F46\u8BF7\u6CE8\u610F\u5728\u540E\u7EED\u793A\u4F8B\u6B65\u9AA4\u4E2D\u5C06\u547D\u4EE4\u4E2D\u7528\u6237\u76F8\u5173\u7684\u4FE1\u606F\u66FF\u6362\u4E3A\u60A8\u81EA\u5DF1\u7684\u7528\u6237\u7EC4\u540D\u4E0E\u7528\u6237\u540D\u3002</p></div><p>\u4E0B\u9762\u7684\u547D\u4EE4\u80FD\u591F\u521B\u5EFA\u7528\u6237\u7EC4 <code>postgres</code> \u548C\u7528\u6237 <code>postgres</code>\uFF0C\u5E76\u4E3A\u8BE5\u7528\u6237\u8D4B\u4E88 sudo \u548C\u5DE5\u4F5C\u76EE\u5F55\u7684\u6743\u9650\u3002\u9700\u8981\u4EE5 root \u7528\u6237\u6267\u884C\u8FD9\u4E9B\u547D\u4EE4\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># install sudo</span>
yum <span class="token function">install</span> -y <span class="token function">sudo</span>
<span class="token comment"># create user and group</span>
<span class="token function">groupadd</span> -r postgres
<span class="token function">useradd</span> -m -g postgres postgres -p <span class="token string">&#39;&#39;</span>
<span class="token function">usermod</span> -aG wheel postgres
<span class="token comment"># make postgres as sudoer</span>
<span class="token function">chmod</span> u+w /etc/sudoers
<span class="token builtin class-name">echo</span> <span class="token string">&#39;postgres ALL=(ALL) NOPASSWD: ALL&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/sudoers
<span class="token function">chmod</span> u-w /etc/sudoers
<span class="token comment"># grant access to home directory</span>
<span class="token function">chown</span> -R postgres:postgres /home/postgres/
<span class="token builtin class-name">echo</span> <span class="token string">&#39;source /etc/bashrc&#39;</span> <span class="token operator">&gt;&gt;</span> /home/postgres/.bashrc
<span class="token comment"># for su postgres</span>
<span class="token function">sed</span> -i <span class="token string">&#39;s/4096/unlimited/g&#39;</span> /etc/security/limits.d/20-nproc.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u4E0B\u6765\uFF0C\u5207\u6362\u5230 <code>postgres</code> \u7528\u6237\uFF0C\u5C31\u53EF\u4EE5\u8FDB\u884C\u540E\u7EED\u7684\u6B65\u9AA4\u4E86\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">su</span> postgres
<span class="token builtin class-name">source</span> /etc/bashrc
<span class="token builtin class-name">cd</span> ~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F9D\u8D56\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56\u5B89\u88C5" aria-hidden="true">#</a> \u4F9D\u8D56\u5B89\u88C5</h3><p>\u5728 PolarDB for PostgreSQL \u7684\u6E90\u7801\u5E93\u6839\u76EE\u5F55\u4E0B\uFF0C\u6709\u4E00\u4E2A <code>install_dependencies.sh</code> \u811A\u672C\uFF0C\u5305\u542B\u4E86 PolarDB \u548C PFS \u9700\u8981\u8FD0\u884C\u7684\u6240\u6709\u4F9D\u8D56\u3002\u56E0\u6B64\uFF0C\u9996\u5148\u9700\u8981\u514B\u9686 PolarDB \u7684\u6E90\u7801\u5E93\u3002</p>`,17),f=n("PolarDB for PostgreSQL \u7684\u4EE3\u7801\u6258\u7BA1\u4E8E "),S={href:"https://github.com/ApsaraDB/PolarDB-for-PostgreSQL",target:"_blank",rel:"noopener noreferrer"},y=n("GitHub"),E=n(" \u4E0A\uFF0C\u7A33\u5B9A\u5206\u652F\u4E3A "),P=s("code",null,"POLARDB_11_STABLE",-1),R=n("\u3002\u5982\u679C\u56E0\u7F51\u7EDC\u539F\u56E0\u4E0D\u80FD\u7A33\u5B9A\u8BBF\u95EE GitHub\uFF0C\u5219\u53EF\u4EE5\u8BBF\u95EE "),D={href:"https://gitee.com/mirrors/PolarDB-for-PostgreSQL",target:"_blank",rel:"noopener noreferrer"},N=n("Gitee \u56FD\u5185\u955C\u50CF"),L=n("\u3002"),x=s("div",{class:"language-bash ext-sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"sudo"),n(" yum "),s("span",{class:"token function"},"install"),n(" -y "),s("span",{class:"token function"},"git"),n(`
`),s("span",{class:"token function"},"git"),n(` clone -b POLARDB_11_STABLE https://github.com/ApsaraDB/PolarDB-for-PostgreSQL.git
`)])])],-1),B=s("div",{class:"language-bash ext-sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"sudo"),n(" yum "),s("span",{class:"token function"},"install"),n(" -y "),s("span",{class:"token function"},"git"),n(`
`),s("span",{class:"token function"},"git"),n(` clone -b POLARDB_11_STABLE https://gitee.com/mirrors/PolarDB-for-PostgreSQL
`)])])],-1),O=t(`<p>\u6E90\u7801\u4E0B\u8F7D\u5B8C\u6BD5\u540E\uFF0C\u4F7F\u7528 <code>sudo</code> \u6267\u884C\u6E90\u4EE3\u7801\u6839\u76EE\u5F55\u4E0B\u7684\u4F9D\u8D56\u5B89\u88C5\u811A\u672C <code>install_dependencies.sh</code> \u81EA\u52A8\u5B8C\u6210\u6240\u6709\u7684\u4F9D\u8D56\u5B89\u88C5\u3002\u5982\u679C\u6709\u5B9A\u5236\u7684\u5F00\u53D1\u9700\u6C42\uFF0C\u8BF7\u81EA\u884C\u4FEE\u6539 <code>install_dependencies.sh</code>\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> PolarDB-for-PostgreSQL
<span class="token function">sudo</span> ./install_dependencies.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function w(A,G){const e=l("ExternalLinkIcon"),i=l("CodeGroupItem"),p=l("CodeGroup");return c(),d("div",null,[u,v,s("p",null,[b,s("a",k,[g,a(e)]),h]),_,s("p",null,[f,s("a",S,[y,a(e)]),E,P,R,s("a",D,[N,a(e)]),L]),a(p,null,{default:o(()=>[a(i,{title:"GitHub"},{default:o(()=>[x]),_:1}),a(i,{title:"Gitee \u56FD\u5185\u955C\u50CF"},{default:o(()=>[B]),_:1})]),_:1}),O])}var q=r(m,[["render",w],["__file","customize-dev-env.html.vue"]]);export{q as default};
