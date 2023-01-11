import{_ as l,o as p,c,b as s,a as n,d as a,e as r,r as t}from"./app.9dd76cc4.js";const d={},u=n("h1",{id:"code-analysis-of-analyze",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#code-analysis-of-analyze","aria-hidden":"true"},"#"),a(" Code Analysis of ANALYZE")],-1),v=r(`<h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2><p>PostgreSQL \u5728\u4F18\u5316\u5668\u4E2D\u4E3A\u4E00\u4E2A\u67E5\u8BE2\u6811\u8F93\u51FA\u4E00\u4E2A\u6267\u884C\u6548\u7387\u6700\u9AD8\u7684\u7269\u7406\u8BA1\u5212\u6811\u3002\u5176\u4E2D\uFF0C\u6267\u884C\u6548\u7387\u9AD8\u4F4E\u7684\u8861\u91CF\u662F\u901A\u8FC7\u4EE3\u4EF7\u4F30\u7B97\u5B9E\u73B0\u7684\u3002\u6BD4\u5982\u901A\u8FC7\u4F30\u7B97\u67E5\u8BE2\u8FD4\u56DE\u5143\u7EC4\u7684\u6761\u6570\uFF0C\u548C\u5143\u7EC4\u7684\u5BBD\u5EA6\uFF0C\u5C31\u53EF\u4EE5\u8BA1\u7B97\u51FA I/O \u5F00\u9500\uFF1B\u4E5F\u53EF\u4EE5\u6839\u636E\u5C06\u8981\u6267\u884C\u7684\u7269\u7406\u64CD\u4F5C\u4F30\u7B97\u51FA\u53EF\u80FD\u9700\u8981\u6D88\u8017\u7684 CPU \u4EE3\u4EF7\u3002\u4F18\u5316\u5668\u901A\u8FC7\u7CFB\u7EDF\u8868 <code>pg_statistic</code> \u83B7\u5F97\u8FD9\u4E9B\u5728\u4EE3\u4EF7\u4F30\u7B97\u8FC7\u7A0B\u9700\u8981\u4F7F\u7528\u5230\u7684\u5173\u952E\u7EDF\u8BA1\u4FE1\u606F\uFF0C\u800C <code>pg_statistic</code> \u7CFB\u7EDF\u8868\u4E2D\u7684\u7EDF\u8BA1\u4FE1\u606F\u53C8\u662F\u901A\u8FC7\u81EA\u52A8\u6216\u624B\u52A8\u7684 <code>ANALYZE</code> \u64CD\u4F5C\uFF08\u6216 <code>VACUUM</code>\uFF09\u8BA1\u7B97\u5F97\u5230\u7684\u3002<code>ANALYZE</code> \u5C06\u4F1A\u626B\u63CF\u8868\u4E2D\u7684\u6570\u636E\u5E76\u6309\u5217\u8FDB\u884C\u5206\u6790\uFF0C\u5C06\u5F97\u5230\u7684\u8BF8\u5982\u6BCF\u5217\u7684\u6570\u636E\u5206\u5E03\u3001\u6700\u5E38\u89C1\u503C\u3001\u9891\u7387\u7B49\u7EDF\u8BA1\u4FE1\u606F\u5199\u5165\u7CFB\u7EDF\u8868\u3002</p><p>\u672C\u6587\u4ECE\u6E90\u7801\u7684\u89D2\u5EA6\u5206\u6790\u4E00\u4E0B <code>ANALYZE</code> \u64CD\u4F5C\u7684\u5B9E\u73B0\u673A\u5236\u3002\u6E90\u7801\u4F7F\u7528\u76EE\u524D PostgreSQL \u6700\u65B0\u7684\u7A33\u5B9A\u7248\u672C PostgreSQL 14\u3002</p><h2 id="statistics" tabindex="-1"><a class="header-anchor" href="#statistics" aria-hidden="true">#</a> Statistics</h2><p>\u9996\u5148\uFF0C\u6211\u4EEC\u5E94\u5F53\u641E\u660E\u767D\u5206\u6790\u64CD\u4F5C\u7684\u8F93\u51FA\u662F\u4EC0\u4E48\u3002\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u770B\u4E00\u770B <code>pg_statistic</code> \u4E2D\u6709\u54EA\u4E9B\u5217\uFF0C\u6BCF\u4E2A\u5217\u7684\u542B\u4E49\u662F\u4EC0\u4E48\u3002\u8FD9\u4E2A\u7CFB\u7EDF\u8868\u4E2D\u7684\u6BCF\u4E00\u884C\u8868\u793A\u5176\u5B83\u6570\u636E\u8868\u4E2D <strong>\u6BCF\u4E00\u5217\u7684\u7EDF\u8BA1\u4FE1\u606F</strong>\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>postgres<span class="token operator">=</span><span class="token comment"># \\d+ pg_statistic</span>
                                 <span class="token keyword">Table</span> <span class="token string">&quot;pg_catalog.pg_statistic&quot;</span>
   <span class="token keyword">Column</span>    <span class="token operator">|</span>   <span class="token keyword">Type</span>   <span class="token operator">|</span> Collation <span class="token operator">|</span> Nullable <span class="token operator">|</span> <span class="token keyword">Default</span> <span class="token operator">|</span> Storage  <span class="token operator">|</span> Stats target <span class="token operator">|</span> Description
<span class="token comment">-------------+----------+-----------+----------+---------+----------+--------------+-------------</span>
 starelid    <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staattnum   <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stainherit  <span class="token operator">|</span> <span class="token keyword">boolean</span>  <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stanullfrac <span class="token operator">|</span> <span class="token keyword">real</span>     <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stawidth    <span class="token operator">|</span> <span class="token keyword">integer</span>  <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stadistinct <span class="token operator">|</span> <span class="token keyword">real</span>     <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stakind1    <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stakind2    <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stakind3    <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stakind4    <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stakind5    <span class="token operator">|</span> <span class="token keyword">smallint</span> <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staop1      <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staop2      <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staop3      <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staop4      <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 staop5      <span class="token operator">|</span> oid      <span class="token operator">|</span>           <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token operator">|</span>         <span class="token operator">|</span> plain    <span class="token operator">|</span>              <span class="token operator">|</span>
 stanumbers1 <span class="token operator">|</span> <span class="token keyword">real</span><span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stanumbers2 <span class="token operator">|</span> <span class="token keyword">real</span><span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stanumbers3 <span class="token operator">|</span> <span class="token keyword">real</span><span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stanumbers4 <span class="token operator">|</span> <span class="token keyword">real</span><span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stanumbers5 <span class="token operator">|</span> <span class="token keyword">real</span><span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stavalues1  <span class="token operator">|</span> anyarray <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stavalues2  <span class="token operator">|</span> anyarray <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stavalues3  <span class="token operator">|</span> anyarray <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stavalues4  <span class="token operator">|</span> anyarray <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
 stavalues5  <span class="token operator">|</span> anyarray <span class="token operator">|</span>           <span class="token operator">|</span>          <span class="token operator">|</span>         <span class="token operator">|</span> <span class="token keyword">extended</span> <span class="token operator">|</span>              <span class="token operator">|</span>
Indexes:
    <span class="token string">&quot;pg_statistic_relid_att_inh_index&quot;</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span> <span class="token keyword">btree</span> <span class="token punctuation">(</span>starelid<span class="token punctuation">,</span> staattnum<span class="token punctuation">,</span> stainherit<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/* ----------------
 *      pg_statistic definition.  cpp turns this into
 *      typedef struct FormData_pg_statistic
 * ----------------
 */</span>
<span class="token function">CATALOG</span><span class="token punctuation">(</span>pg_statistic<span class="token punctuation">,</span><span class="token number">2619</span><span class="token punctuation">,</span>StatisticRelationId<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* These fields form the unique key for the entry: */</span>
    Oid         starelid <span class="token function">BKI_LOOKUP</span><span class="token punctuation">(</span>pg_class<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/* relation containing
                                                 * attribute */</span>
    int16       staattnum<span class="token punctuation">;</span>      <span class="token comment">/* attribute (column) stats are for */</span>
    bool        stainherit<span class="token punctuation">;</span>     <span class="token comment">/* true if inheritance children are included */</span>

    <span class="token comment">/* the fraction of the column&#39;s entries that are NULL: */</span>
    float4      stanullfrac<span class="token punctuation">;</span>

    <span class="token comment">/*
     * stawidth is the average width in bytes of non-null entries.  For
     * fixed-width datatypes this is of course the same as the typlen, but for
     * var-width types it is more useful.  Note that this is the average width
     * of the data as actually stored, post-TOASTing (eg, for a
     * moved-out-of-line value, only the size of the pointer object is
     * counted).  This is the appropriate definition for the primary use of
     * the statistic, which is to estimate sizes of in-memory hash tables of
     * tuples.
     */</span>
    int32       stawidth<span class="token punctuation">;</span>

    <span class="token comment">/* ----------------
     * stadistinct indicates the (approximate) number of distinct non-null
     * data values in the column.  The interpretation is:
     *      0       unknown or not computed
     *      &gt; 0     actual number of distinct values
     *      &lt; 0     negative of multiplier for number of rows
     * The special negative case allows us to cope with columns that are
     * unique (stadistinct = -1) or nearly so (for example, a column in which
     * non-null values appear about twice on the average could be represented
     * by stadistinct = -0.5 if there are no nulls, or -0.4 if 20% of the
     * column is nulls).  Because the number-of-rows statistic in pg_class may
     * be updated more frequently than pg_statistic is, it&#39;s important to be
     * able to describe such situations as a multiple of the number of rows,
     * rather than a fixed number of distinct values.  But in other cases a
     * fixed number is correct (eg, a boolean column).
     * ----------------
     */</span>
    float4      stadistinct<span class="token punctuation">;</span>

    <span class="token comment">/* ----------------
     * To allow keeping statistics on different kinds of datatypes,
     * we do not hard-wire any particular meaning for the remaining
     * statistical fields.  Instead, we provide several &quot;slots&quot; in which
     * statistical data can be placed.  Each slot includes:
     *      kind            integer code identifying kind of data (see below)
     *      op              OID of associated operator, if needed
     *      coll            OID of relevant collation, or 0 if none
     *      numbers         float4 array (for statistical values)
     *      values          anyarray (for representations of data values)
     * The ID, operator, and collation fields are never NULL; they are zeroes
     * in an unused slot.  The numbers and values fields are NULL in an
     * unused slot, and might also be NULL in a used slot if the slot kind
     * has no need for one or the other.
     * ----------------
     */</span>

    int16       stakind1<span class="token punctuation">;</span>
    int16       stakind2<span class="token punctuation">;</span>
    int16       stakind3<span class="token punctuation">;</span>
    int16       stakind4<span class="token punctuation">;</span>
    int16       stakind5<span class="token punctuation">;</span>

    Oid         staop1 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_operator<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         staop2 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_operator<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         staop3 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_operator<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         staop4 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_operator<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         staop5 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_operator<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Oid         stacoll1 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_collation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         stacoll2 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_collation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         stacoll3 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_collation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         stacoll4 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_collation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Oid         stacoll5 <span class="token function">BKI_LOOKUP_OPT</span><span class="token punctuation">(</span>pg_collation<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CATALOG_VARLEN           </span><span class="token comment">/* variable-length fields start here */</span></span>
    float4      stanumbers1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    float4      stanumbers2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    float4      stanumbers3<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    float4      stanumbers4<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    float4      stanumbers5<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">/*
     * Values in these arrays are values of the column&#39;s data type, or of some
     * related type such as an array element type.  We presently have to cheat
     * quite a bit to allow polymorphic arrays of this kind, but perhaps
     * someday it&#39;ll be a less bogus facility.
     */</span>
    anyarray    stavalues1<span class="token punctuation">;</span>
    anyarray    stavalues2<span class="token punctuation">;</span>
    anyarray    stavalues3<span class="token punctuation">;</span>
    anyarray    stavalues4<span class="token punctuation">;</span>
    anyarray    stavalues5<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span> FormData_pg_statistic<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u6570\u636E\u5E93\u547D\u4EE4\u884C\u7684\u89D2\u5EA6\u548C\u5185\u6838 C \u4EE3\u7801\u7684\u89D2\u5EA6\u6765\u770B\uFF0C\u7EDF\u8BA1\u4FE1\u606F\u7684\u5185\u5BB9\u90FD\u662F\u4E00\u81F4\u7684\u3002\u6240\u6709\u7684\u5C5E\u6027\u90FD\u4EE5 <code>sta</code> \u5F00\u5934\u3002\u5176\u4E2D\uFF1A</p><ul><li><code>starelid</code> \u8868\u793A\u5F53\u524D\u5217\u6240\u5C5E\u7684\u8868\u6216\u7D22\u5F15</li><li><code>staattnum</code> \u8868\u793A\u672C\u884C\u7EDF\u8BA1\u4FE1\u606F\u5C5E\u4E8E\u4E0A\u8FF0\u8868\u6216\u7D22\u5F15\u4E2D\u7684\u7B2C\u51E0\u5217</li><li><code>stainherit</code> \u8868\u793A\u7EDF\u8BA1\u4FE1\u606F\u662F\u5426\u5305\u542B\u5B50\u5217</li><li><code>stanullfrac</code> \u8868\u793A\u8BE5\u5217\u4E2D\u503C\u4E3A NULL \u7684\u884C\u6570\u6BD4\u4F8B</li><li><code>stawidth</code> \u8868\u793A\u8BE5\u5217\u975E\u7A7A\u503C\u7684\u5E73\u5747\u5BBD\u5EA6</li><li><code>stadistinct</code> \u8868\u793A\u5217\u4E2D\u975E\u7A7A\u503C\u7684\u552F\u4E00\u503C\u6570\u91CF <ul><li><code>0</code> \u8868\u793A\u672A\u77E5\u6216\u672A\u8BA1\u7B97</li><li><code>&gt; 0</code> \u8868\u793A\u552F\u4E00\u503C\u7684\u5B9E\u9645\u6570\u91CF</li><li><code>&lt; 0</code> \u8868\u793A <em>negative of multiplier for number of rows</em></li></ul></li></ul><p>\u7531\u4E8E\u4E0D\u540C\u6570\u636E\u7C7B\u578B\u6240\u80FD\u591F\u88AB\u8BA1\u7B97\u7684\u7EDF\u8BA1\u4FE1\u606F\u53EF\u80FD\u4F1A\u6709\u4E00\u4E9B\u7EC6\u5FAE\u7684\u5DEE\u522B\uFF0C\u5728\u63A5\u4E0B\u6765\u7684\u90E8\u5206\u4E2D\uFF0CPostgreSQL \u9884\u7559\u4E86\u4E00\u4E9B\u5B58\u653E\u7EDF\u8BA1\u4FE1\u606F\u7684 <strong>\u69FD\uFF08slots\uFF09</strong>\u3002\u76EE\u524D\u7684\u5185\u6838\u91CC\u6682\u65F6\u9884\u7559\u4E86\u4E94\u4E2A\u69FD\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_NUM_SLOTS</span>  <span class="token expression"><span class="token number">5</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6BCF\u4E00\u79CD\u7279\u5B9A\u7684\u7EDF\u8BA1\u4FE1\u606F\u53EF\u4EE5\u4F7F\u7528\u4E00\u4E2A\u69FD\uFF0C\u5177\u4F53\u5728\u69FD\u91CC\u653E\u4EC0\u4E48\u5B8C\u5168\u7531\u8FD9\u79CD\u7EDF\u8BA1\u4FE1\u606F\u7684\u5B9A\u4E49\u81EA\u7531\u51B3\u5B9A\u3002\u6BCF\u4E00\u4E2A\u69FD\u7684\u53EF\u7528\u7A7A\u95F4\u5305\u542B\u8FD9\u4E48\u51E0\u4E2A\u90E8\u5206\uFF08\u5176\u4E2D\u7684 <code>N</code> \u8868\u793A\u69FD\u7684\u7F16\u53F7\uFF0C\u53D6\u503C\u4E3A <code>1</code> \u5230 <code>5</code>\uFF09\uFF1A</p><ul><li><code>stakindN</code>\uFF1A\u6807\u8BC6\u8FD9\u79CD\u7EDF\u8BA1\u4FE1\u606F\u7684\u6574\u6570\u7F16\u53F7</li><li><code>staopN</code>\uFF1A\u7528\u4E8E\u8BA1\u7B97\u6216\u4F7F\u7528\u7EDF\u8BA1\u4FE1\u606F\u7684\u8FD0\u7B97\u7B26 OID</li><li><code>stacollN</code>\uFF1A\u6392\u5E8F\u89C4\u5219 OID</li><li><code>stanumbersN</code>\uFF1A\u6D6E\u70B9\u6570\u6570\u7EC4</li><li><code>stavaluesN</code>\uFF1A\u4EFB\u610F\u503C\u6570\u7EC4</li></ul><p>PostgreSQL \u5185\u6838\u4E2D\u89C4\u5B9A\uFF0C\u7EDF\u8BA1\u4FE1\u606F\u7684\u7F16\u53F7 <code>1</code> \u81F3 <code>99</code> \u88AB\u4FDD\u7559\u7ED9 PostgreSQL \u6838\u5FC3\u7EDF\u8BA1\u4FE1\u606F\u4F7F\u7528\uFF0C\u5176\u5B83\u90E8\u5206\u7684\u7F16\u53F7\u5B89\u6392\u5982\u5185\u6838\u6CE8\u91CA\u6240\u793A\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * The present allocation of &quot;kind&quot; codes is:
 *
 *  1-99:       reserved for assignment by the core PostgreSQL project
 *              (values in this range will be documented in this file)
 *  100-199:    reserved for assignment by the PostGIS project
 *              (values to be documented in PostGIS documentation)
 *  200-299:    reserved for assignment by the ESRI ST_Geometry project
 *              (values to be documented in ESRI ST_Geometry documentation)
 *  300-9999:   reserved for future public assignments
 *
 * For private use you may choose a &quot;kind&quot; code at random in the range
 * 10000-30000.  However, for code that is to be widely disseminated it is
 * better to obtain a publicly defined &quot;kind&quot; code by request from the
 * PostgreSQL Global Development Group.
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u76EE\u524D\u53EF\u4EE5\u5728\u5185\u6838\u4EE3\u7801\u4E2D\u770B\u5230\u7684 PostgreSQL \u6838\u5FC3\u7EDF\u8BA1\u4FE1\u606F\u6709 7 \u4E2A\uFF0C\u7F16\u53F7\u5206\u522B\u4ECE <code>1</code> \u5230 <code>7</code>\u3002\u6211\u4EEC\u53EF\u4EE5\u770B\u770B\u8FD9 7 \u79CD\u7EDF\u8BA1\u4FE1\u606F\u5206\u522B\u5982\u4F55\u4F7F\u7528\u4E0A\u8FF0\u7684\u69FD\u3002</p><h3 id="most-common-values-mcv" tabindex="-1"><a class="header-anchor" href="#most-common-values-mcv" aria-hidden="true">#</a> Most Common Values (MCV)</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * In a &quot;most common values&quot; slot, staop is the OID of the &quot;=&quot; operator
 * used to decide whether values are the same or not, and stacoll is the
 * collation used (same as column&#39;s collation).  stavalues contains
 * the K most common non-null values appearing in the column, and stanumbers
 * contains their frequencies (fractions of total row count).  The values
 * shall be ordered in decreasing frequency.  Note that since the arrays are
 * variable-size, K may be chosen by the statistics collector.  Values should
 * not appear in MCV unless they have been observed to occur more than once;
 * a unique column will have no MCV slot.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_MCV</span>  <span class="token expression"><span class="token number">1</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5BF9\u4E8E\u4E00\u4E2A\u5217\u4E2D\u7684 <strong>\u6700\u5E38\u89C1\u503C</strong>\uFF0C\u5728 <code>staop</code> \u4E2D\u4FDD\u5B58 <code>=</code> \u8FD0\u7B97\u7B26\u6765\u51B3\u5B9A\u4E00\u4E2A\u503C\u662F\u5426\u7B49\u4E8E\u4E00\u4E2A\u6700\u5E38\u89C1\u503C\u3002\u5728 <code>stavalues</code> \u4E2D\u4FDD\u5B58\u4E86\u8BE5\u5217\u4E2D\u6700\u5E38\u89C1\u7684 K \u4E2A\u975E\u7A7A\u503C\uFF0C<code>stanumbers</code> \u4E2D\u5206\u522B\u4FDD\u5B58\u4E86\u8FD9 K \u4E2A\u503C\u51FA\u73B0\u7684\u9891\u7387\u3002</p><h3 id="histogram" tabindex="-1"><a class="header-anchor" href="#histogram" aria-hidden="true">#</a> Histogram</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;histogram&quot; slot describes the distribution of scalar data.  staop is
 * the OID of the &quot;&lt;&quot; operator that describes the sort ordering, and stacoll
 * is the relevant collation.  (In theory more than one histogram could appear,
 * if a datatype has more than one useful sort operator or we care about more
 * than one collation.  Currently the collation will always be that of the
 * underlying column.)  stavalues contains M (&gt;=2) non-null values that
 * divide the non-null column data values into M-1 bins of approximately equal
 * population.  The first stavalues item is the MIN and the last is the MAX.
 * stanumbers is not used and should be NULL.  IMPORTANT POINT: if an MCV
 * slot is also provided, then the histogram describes the data distribution
 * *after removing the values listed in MCV* (thus, it&#39;s a &quot;compressed
 * histogram&quot; in the technical parlance).  This allows a more accurate
 * representation of the distribution of a column with some very-common
 * values.  In a column with only a few distinct values, it&#39;s possible that
 * the MCV list describes the entire data population; in this case the
 * histogram reduces to empty and should be omitted.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_HISTOGRAM</span>  <span class="token expression"><span class="token number">2</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u4E00\u4E2A\uFF08\u6570\u503C\uFF09\u5217\u7684\u6570\u636E\u5206\u5E03\u76F4\u65B9\u56FE\u3002<code>staop</code> \u4FDD\u5B58 <code>&lt;</code> \u8FD0\u7B97\u7B26\u7528\u4E8E\u51B3\u5B9A\u6570\u636E\u5206\u5E03\u7684\u6392\u5E8F\u987A\u5E8F\u3002<code>stavalues</code> \u5305\u542B\u4E86\u80FD\u591F\u5C06\u8BE5\u5217\u7684\u975E\u7A7A\u503C\u5212\u5206\u5230 M - 1 \u4E2A\u5BB9\u91CF\u63A5\u8FD1\u7684\u6876\u4E2D\u7684 M \u4E2A\u975E\u7A7A\u503C\u3002\u5982\u679C\u8BE5\u5217\u4E2D\u5DF2\u7ECF\u6709\u4E86 MCV \u7684\u69FD\uFF0C\u90A3\u4E48\u6570\u636E\u5206\u5E03\u76F4\u65B9\u56FE\u4E2D\u5C06\u4E0D\u5305\u542B MCV \u4E2D\u7684\u503C\uFF0C\u4EE5\u83B7\u5F97\u66F4\u7CBE\u786E\u7684\u6570\u636E\u5206\u5E03\u3002</p><h3 id="correlation" tabindex="-1"><a class="header-anchor" href="#correlation" aria-hidden="true">#</a> Correlation</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;correlation&quot; slot describes the correlation between the physical order
 * of table tuples and the ordering of data values of this column, as seen
 * by the &quot;&lt;&quot; operator identified by staop with the collation identified by
 * stacoll.  (As with the histogram, more than one entry could theoretically
 * appear.)  stavalues is not used and should be NULL.  stanumbers contains
 * a single entry, the correlation coefficient between the sequence of data
 * values and the sequence of their actual tuple positions.  The coefficient
 * ranges from +1 to -1.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_CORRELATION</span>  <span class="token expression"><span class="token number">3</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728 <code>stanumbers</code> \u4E2D\u4FDD\u5B58\u6570\u636E\u503C\u548C\u5B83\u4EEC\u7684\u5B9E\u9645\u5143\u7EC4\u4F4D\u7F6E\u7684\u76F8\u5173\u7CFB\u6570\u3002</p><h3 id="most-common-elements" tabindex="-1"><a class="header-anchor" href="#most-common-elements" aria-hidden="true">#</a> Most Common Elements</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;most common elements&quot; slot is similar to a &quot;most common values&quot; slot,
 * except that it stores the most common non-null *elements* of the column
 * values.  This is useful when the column datatype is an array or some other
 * type with identifiable elements (for instance, tsvector).  staop contains
 * the equality operator appropriate to the element type, and stacoll
 * contains the collation to use with it.  stavalues contains
 * the most common element values, and stanumbers their frequencies.  Unlike
 * MCV slots, frequencies are measured as the fraction of non-null rows the
 * element value appears in, not the frequency of all rows.  Also unlike
 * MCV slots, the values are sorted into the element type&#39;s default order
 * (to support binary search for a particular value).  Since this puts the
 * minimum and maximum frequencies at unpredictable spots in stanumbers,
 * there are two extra members of stanumbers, holding copies of the minimum
 * and maximum frequencies.  Optionally, there can be a third extra member,
 * which holds the frequency of null elements (expressed in the same terms:
 * the fraction of non-null rows that contain at least one null element).  If
 * this member is omitted, the column is presumed to contain no null elements.
 *
 * Note: in current usage for tsvector columns, the stavalues elements are of
 * type text, even though their representation within tsvector is not
 * exactly text.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_MCELEM</span>  <span class="token expression"><span class="token number">4</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0E MCV \u7C7B\u4F3C\uFF0C\u4F46\u662F\u4FDD\u5B58\u7684\u662F\u5217\u4E2D\u7684 <strong>\u6700\u5E38\u89C1\u5143\u7D20</strong>\uFF0C\u4E3B\u8981\u7528\u4E8E\u6570\u7EC4\u7B49\u7C7B\u578B\u3002\u540C\u6837\uFF0C\u5728 <code>staop</code> \u4E2D\u4FDD\u5B58\u4E86\u7B49\u503C\u8FD0\u7B97\u7B26\u7528\u4E8E\u5224\u65AD\u5143\u7D20\u51FA\u73B0\u7684\u9891\u7387\u9AD8\u4F4E\u3002\u4F46\u4E0E MCV \u4E0D\u540C\u7684\u662F\u8FD9\u91CC\u7684\u9891\u7387\u8BA1\u7B97\u7684\u5206\u6BCD\u662F\u975E\u7A7A\u7684\u884C\uFF0C\u800C\u4E0D\u662F\u6240\u6709\u7684\u884C\u3002\u53E6\u5916\uFF0C\u6240\u6709\u7684\u5E38\u89C1\u5143\u7D20\u4F7F\u7528\u5143\u7D20\u5BF9\u5E94\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u987A\u5E8F\u8FDB\u884C\u6392\u5E8F\uFF0C\u4EE5\u4FBF\u4E8C\u5206\u67E5\u627E\u3002</p><h3 id="distinct-elements-count-histogram" tabindex="-1"><a class="header-anchor" href="#distinct-elements-count-histogram" aria-hidden="true">#</a> Distinct Elements Count Histogram</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;distinct elements count histogram&quot; slot describes the distribution of
 * the number of distinct element values present in each row of an array-type
 * column.  Only non-null rows are considered, and only non-null elements.
 * staop contains the equality operator appropriate to the element type,
 * and stacoll contains the collation to use with it.
 * stavalues is not used and should be NULL.  The last member of stanumbers is
 * the average count of distinct element values over all non-null rows.  The
 * preceding M (&gt;=2) members form a histogram that divides the population of
 * distinct-elements counts into M-1 bins of approximately equal population.
 * The first of these is the minimum observed count, and the last the maximum.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_DECHIST</span>  <span class="token expression"><span class="token number">5</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u5217\u4E2D\u51FA\u73B0\u6240\u6709\u6570\u503C\u7684\u9891\u7387\u5206\u5E03\u76F4\u65B9\u56FE\u3002<code>stanumbers</code> \u6570\u7EC4\u7684\u524D M \u4E2A\u5143\u7D20\u662F\u5C06\u5217\u4E2D\u6240\u6709\u552F\u4E00\u503C\u7684\u51FA\u73B0\u6B21\u6570\u5927\u81F4\u5747\u5206\u5230 M - 1 \u4E2A\u6876\u4E2D\u7684\u8FB9\u754C\u503C\u3002\u540E\u7EED\u8DDF\u4E0A\u4E00\u4E2A\u6240\u6709\u552F\u4E00\u503C\u7684\u5E73\u5747\u51FA\u73B0\u6B21\u6570\u3002\u8FD9\u4E2A\u7EDF\u8BA1\u4FE1\u606F\u5E94\u8BE5\u4F1A\u88AB\u7528\u4E8E\u8BA1\u7B97 <em>\u9009\u62E9\u7387</em>\u3002</p><h3 id="length-histogram" tabindex="-1"><a class="header-anchor" href="#length-histogram" aria-hidden="true">#</a> Length Histogram</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;length histogram&quot; slot describes the distribution of range lengths in
 * rows of a range-type column. stanumbers contains a single entry, the
 * fraction of empty ranges. stavalues is a histogram of non-empty lengths, in
 * a format similar to STATISTIC_KIND_HISTOGRAM: it contains M (&gt;=2) range
 * values that divide the column data values into M-1 bins of approximately
 * equal population. The lengths are stored as float8s, as measured by the
 * range type&#39;s subdiff function. Only non-null rows are considered.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_RANGE_LENGTH_HISTOGRAM</span>  <span class="token expression"><span class="token number">6</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u957F\u5EA6\u76F4\u65B9\u56FE\u63CF\u8FF0\u4E86\u4E00\u4E2A\u8303\u56F4\u7C7B\u578B\u7684\u5217\u7684\u8303\u56F4\u957F\u5EA6\u5206\u5E03\u3002\u540C\u6837\u4E5F\u662F\u4E00\u4E2A\u957F\u5EA6\u4E3A M \u7684\u76F4\u65B9\u56FE\uFF0C\u4FDD\u5B58\u5728 <code>stanumbers</code> \u4E2D\u3002</p><h3 id="bounds-histogram" tabindex="-1"><a class="header-anchor" href="#bounds-histogram" aria-hidden="true">#</a> Bounds Histogram</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * A &quot;bounds histogram&quot; slot is similar to STATISTIC_KIND_HISTOGRAM, but for
 * a range-type column.  stavalues contains M (&gt;=2) range values that divide
 * the column data values into M-1 bins of approximately equal population.
 * Unlike a regular scalar histogram, this is actually two histograms combined
 * into a single array, with the lower bounds of each value forming a
 * histogram of lower bounds, and the upper bounds a histogram of upper
 * bounds.  Only non-NULL, non-empty ranges are included.
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STATISTIC_KIND_BOUNDS_HISTOGRAM</span>  <span class="token expression"><span class="token number">7</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FB9\u754C\u76F4\u65B9\u56FE\u540C\u6837\u4E5F\u88AB\u7528\u4E8E\u8303\u56F4\u7C7B\u578B\uFF0C\u4E0E\u6570\u636E\u5206\u5E03\u76F4\u65B9\u56FE\u7C7B\u4F3C\u3002<code>stavalues</code> \u4E2D\u4FDD\u5B58\u4E86\u4F7F\u8BE5\u5217\u6570\u503C\u5927\u81F4\u5747\u5206\u5230 M - 1 \u4E2A\u6876\u4E2D\u7684 M \u4E2A\u8303\u56F4\u8FB9\u754C\u503C\u3002\u53EA\u8003\u8651\u975E\u7A7A\u884C\u3002</p><h2 id="kernel-execution-of-analyze" tabindex="-1"><a class="header-anchor" href="#kernel-execution-of-analyze" aria-hidden="true">#</a> Kernel Execution of ANALYZE</h2><p>\u77E5\u9053 <code>pg_statistic</code> \u6700\u7EC8\u9700\u8981\u4FDD\u5B58\u54EA\u4E9B\u4FE1\u606F\u4EE5\u540E\uFF0C\u518D\u6765\u770B\u770B\u5185\u6838\u5982\u4F55\u6536\u96C6\u548C\u8BA1\u7B97\u8FD9\u4E9B\u4FE1\u606F\u3002\u8BA9\u6211\u4EEC\u8FDB\u5165 PostgreSQL \u5185\u6838\u7684\u6267\u884C\u5668\u4EE3\u7801\u4E2D\u3002\u5BF9\u4E8E <code>ANALYZE</code> \u8FD9\u79CD\u5DE5\u5177\u6027\u8D28\u7684\u6307\u4EE4\uFF0C\u6267\u884C\u5668\u4EE3\u7801\u901A\u8FC7 <code>standard_ProcessUtility()</code> \u51FD\u6570\u4E2D\u7684 switch case \u5C06\u6BCF\u4E00\u79CD\u6307\u4EE4\u8DEF\u7531\u5230\u5B9E\u73B0\u76F8\u5E94\u529F\u80FD\u7684\u51FD\u6570\u4E2D\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * standard_ProcessUtility itself deals only with utility commands for
 * which we do not provide event trigger support.  Commands that do have
 * such support are passed down to ProcessUtilitySlow, which contains the
 * necessary infrastructure for such triggers.
 *
 * This division is not just for performance: it&#39;s critical that the
 * event trigger code not be invoked when doing START TRANSACTION for
 * example, because we might need to refresh the event trigger cache,
 * which requires being in a valid transaction.
 */</span>
<span class="token keyword">void</span>
<span class="token function">standard_ProcessUtility</span><span class="token punctuation">(</span>PlannedStmt <span class="token operator">*</span>pstmt<span class="token punctuation">,</span>
                        <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>queryString<span class="token punctuation">,</span>
                        bool readOnlyTree<span class="token punctuation">,</span>
                        ProcessUtilityContext context<span class="token punctuation">,</span>
                        ParamListInfo params<span class="token punctuation">,</span>
                        QueryEnvironment <span class="token operator">*</span>queryEnv<span class="token punctuation">,</span>
                        DestReceiver <span class="token operator">*</span>dest<span class="token punctuation">,</span>
                        QueryCompletion <span class="token operator">*</span>qc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token function">nodeTag</span><span class="token punctuation">(</span>parsetree<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>

        <span class="token keyword">case</span> T_VacuumStmt<span class="token operator">:</span>
            <span class="token function">ExecVacuum</span><span class="token punctuation">(</span>pstate<span class="token punctuation">,</span> <span class="token punctuation">(</span>VacuumStmt <span class="token operator">*</span><span class="token punctuation">)</span> parsetree<span class="token punctuation">,</span> isTopLevel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ANALYZE</code> \u7684\u5904\u7406\u903B\u8F91\u5165\u53E3\u548C <code>VACUUM</code> \u4E00\u81F4\uFF0C\u8FDB\u5165 <code>ExecVacuum()</code> \u51FD\u6570\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * Primary entry point for manual VACUUM and ANALYZE commands
 *
 * This is mainly a preparation wrapper for the real operations that will
 * happen in vacuum().
 */</span>
<span class="token keyword">void</span>
<span class="token function">ExecVacuum</span><span class="token punctuation">(</span>ParseState <span class="token operator">*</span>pstate<span class="token punctuation">,</span> VacuumStmt <span class="token operator">*</span>vacstmt<span class="token punctuation">,</span> bool isTopLevel<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">/* Now go through the common routine */</span>
    <span class="token function">vacuum</span><span class="token punctuation">(</span>vacstmt<span class="token operator">-&gt;</span>rels<span class="token punctuation">,</span> <span class="token operator">&amp;</span>params<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> isTopLevel<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728 parse \u4E86\u4E00\u5927\u5806 option \u4E4B\u540E\uFF0C\u8FDB\u5165\u4E86 <code>vacuum()</code> \u51FD\u6570\u3002\u5728\u8FD9\u91CC\uFF0C\u5185\u6838\u4EE3\u7801\u5C06\u4F1A\u9996\u5148\u660E\u786E\u4E00\u4E0B\u8981\u5206\u6790\u54EA\u4E9B\u8868\u3002\u56E0\u4E3A <code>ANALYZE</code> \u547D\u4EE4\u5728\u4F7F\u7528\u4E0A\u53EF\u4EE5\uFF1A</p><ul><li>\u5206\u6790\u6574\u4E2A\u6570\u636E\u5E93\u4E2D\u7684\u6240\u6709\u8868</li><li>\u5206\u6790\u67D0\u51E0\u4E2A\u7279\u5B9A\u7684\u8868</li><li>\u5206\u6790\u67D0\u4E2A\u8868\u7684\u67D0\u51E0\u4E2A\u7279\u5B9A\u5217</li></ul><p>\u5728\u660E\u786E\u8981\u5206\u6790\u54EA\u4E9B\u8868\u4EE5\u540E\uFF0C\u4F9D\u6B21\u5C06\u6BCF\u4E00\u4E2A\u8868\u4F20\u5165 <code>analyze_rel()</code> \u51FD\u6570\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>params<span class="token operator">-&gt;</span>options <span class="token operator">&amp;</span> VACOPT_ANALYZE<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token function">analyze_rel</span><span class="token punctuation">(</span>vrel<span class="token operator">-&gt;</span>oid<span class="token punctuation">,</span> vrel<span class="token operator">-&gt;</span>relation<span class="token punctuation">,</span> params<span class="token punctuation">,</span>
                vrel<span class="token operator">-&gt;</span>va_cols<span class="token punctuation">,</span> in_outer_xact<span class="token punctuation">,</span> vac_strategy<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FDB\u5165 <code>analyze_rel()</code> \u51FD\u6570\u4EE5\u540E\uFF0C\u5185\u6838\u4EE3\u7801\u5C06\u4F1A\u5BF9\u5C06\u8981\u88AB\u5206\u6790\u7684\u8868\u52A0 <code>ShareUpdateExclusiveLock</code> \u9501\uFF0C\u4EE5\u9632\u6B62\u4E24\u4E2A\u5E76\u53D1\u8FDB\u884C\u7684 <code>ANALYZE</code>\u3002\u7136\u540E\u6839\u636E\u5F85\u5206\u6790\u8868\u7684\u7C7B\u578B\u6765\u51B3\u5B9A\u5177\u4F53\u7684\u5904\u7406\u65B9\u5F0F\uFF08\u6BD4\u5982\u5206\u6790\u4E00\u4E2A FDW \u5916\u8868\u5C31\u5E94\u8BE5\u76F4\u63A5\u8C03\u7528 FDW routine \u4E2D\u63D0\u4F9B\u7684 ANALYZE \u529F\u80FD\u4E86\uFF09\u3002\u63A5\u4E0B\u6765\uFF0C\u5C06\u8FD9\u4E2A\u8868\u4F20\u5165 <code>do_analyze_rel()</code> \u51FD\u6570\u4E2D\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 *  analyze_rel() -- analyze one relation
 *
 * relid identifies the relation to analyze.  If relation is supplied, use
 * the name therein for reporting any failure to open/lock the rel; do not
 * use it once we&#39;ve successfully opened the rel, since it might be stale.
 */</span>
<span class="token keyword">void</span>
<span class="token function">analyze_rel</span><span class="token punctuation">(</span>Oid relid<span class="token punctuation">,</span> RangeVar <span class="token operator">*</span>relation<span class="token punctuation">,</span>
            VacuumParams <span class="token operator">*</span>params<span class="token punctuation">,</span> List <span class="token operator">*</span>va_cols<span class="token punctuation">,</span> bool in_outer_xact<span class="token punctuation">,</span>
            BufferAccessStrategy bstrategy<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">/*
     * Do the normal non-recursive ANALYZE.  We can skip this for partitioned
     * tables, which don&#39;t contain any rows.
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>onerel<span class="token operator">-&gt;</span>rd_rel<span class="token operator">-&gt;</span>relkind <span class="token operator">!=</span> RELKIND_PARTITIONED_TABLE<span class="token punctuation">)</span>
        <span class="token function">do_analyze_rel</span><span class="token punctuation">(</span>onerel<span class="token punctuation">,</span> params<span class="token punctuation">,</span> va_cols<span class="token punctuation">,</span> acquirefunc<span class="token punctuation">,</span>
                       relpages<span class="token punctuation">,</span> false<span class="token punctuation">,</span> in_outer_xact<span class="token punctuation">,</span> elevel<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FDB\u5165 <code>do_analyze_rel()</code> \u51FD\u6570\u540E\uFF0C\u5185\u6838\u4EE3\u7801\u5C06\u8FDB\u4E00\u6B65\u660E\u786E\u8981\u5206\u6790\u4E00\u4E2A\u8868\u4E2D\u7684\u54EA\u4E9B\u5217\uFF1A\u7528\u6237\u53EF\u80FD\u6307\u5B9A\u53EA\u5206\u6790\u8868\u4E2D\u7684\u67D0\u51E0\u4E2A\u5217\u2014\u2014\u88AB\u9891\u7E41\u8BBF\u95EE\u7684\u5217\u624D\u66F4\u6709\u88AB\u5206\u6790\u7684\u4EF7\u503C\u3002\u7136\u540E\u8FD8\u8981\u6253\u5F00\u5F85\u5206\u6790\u8868\u7684\u6240\u6709\u7D22\u5F15\uFF0C\u770B\u770B\u662F\u5426\u6709\u53EF\u4EE5\u88AB\u5206\u6790\u7684\u5217\u3002</p><p>\u4E3A\u4E86\u5F97\u5230\u6BCF\u4E00\u5217\u7684\u7EDF\u8BA1\u4FE1\u606F\uFF0C\u663E\u7136\u6211\u4EEC\u9700\u8981\u628A\u6BCF\u4E00\u5217\u7684\u6570\u636E\u4ECE\u78C1\u76D8\u4E0A\u8BFB\u8D77\u6765\u518D\u53BB\u505A\u8BA1\u7B97\u3002\u8FD9\u91CC\u5C31\u6709\u4E00\u4E2A\u6BD4\u8F83\u5173\u952E\u7684\u95EE\u9898\u4E86\uFF1A\u5230\u5E95\u626B\u63CF\u591A\u5C11\u884C\u6570\u636E\u5462\uFF1F\u7406\u8BBA\u4E0A\uFF0C\u5206\u6790\u5C3D\u53EF\u80FD\u591A\u7684\u6570\u636E\uFF0C\u6700\u597D\u662F\u5168\u90E8\u7684\u6570\u636E\uFF0C\u80AF\u5B9A\u80FD\u591F\u5F97\u5230\u6700\u7CBE\u786E\u7684\u7EDF\u8BA1\u6570\u636E\uFF1B\u4F46\u662F\u5BF9\u4E00\u5F20\u5F88\u5927\u7684\u8868\u6765\u8BF4\uFF0C\u6211\u4EEC\u6CA1\u6709\u529E\u6CD5\u5728\u5185\u5B58\u4E2D\u653E\u4E0B\u6240\u6709\u7684\u6570\u636E\uFF0C\u5E76\u4E14\u5206\u6790\u7684\u963B\u585E\u65F6\u95F4\u4E5F\u662F\u4E0D\u53EF\u63A5\u53D7\u7684\u3002\u6240\u4EE5\u7528\u6237\u53EF\u4EE5\u6307\u5B9A\u8981\u91C7\u6837\u7684\u6700\u5927\u884C\u6570\uFF0C\u4ECE\u800C\u5728\u8FD0\u884C\u5F00\u9500\u548C\u7EDF\u8BA1\u4FE1\u606F\u51C6\u786E\u6027\u4E0A\u8FBE\u6210\u4E00\u4E2A\u59A5\u534F\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * Determine how many rows we need to sample, using the worst case from
 * all analyzable columns.  We use a lower bound of 100 rows to avoid
 * possible overflow in Vitter&#39;s algorithm.  (Note: that will also be the
 * target in the corner case where there are no analyzable columns.)
 */</span>
targrows <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> attr_cnt<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>targrows <span class="token operator">&lt;</span> vacattrstats<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>minrows<span class="token punctuation">)</span>
        targrows <span class="token operator">=</span> vacattrstats<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>minrows<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>ind <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> ind <span class="token operator">&lt;</span> nindexes<span class="token punctuation">;</span> ind<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    AnlIndexData <span class="token operator">*</span>thisdata <span class="token operator">=</span> <span class="token operator">&amp;</span>indexdata<span class="token punctuation">[</span>ind<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> thisdata<span class="token operator">-&gt;</span>attr_cnt<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>targrows <span class="token operator">&lt;</span> thisdata<span class="token operator">-&gt;</span>vacattrstats<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>minrows<span class="token punctuation">)</span>
            targrows <span class="token operator">=</span> thisdata<span class="token operator">-&gt;</span>vacattrstats<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>minrows<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
 * Look at extended statistics objects too, as those may define custom
 * statistics target. So we may need to sample more rows and then build
 * the statistics with enough detail.
 */</span>
minrows <span class="token operator">=</span> <span class="token function">ComputeExtStatisticsRows</span><span class="token punctuation">(</span>onerel<span class="token punctuation">,</span> attr_cnt<span class="token punctuation">,</span> vacattrstats<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>targrows <span class="token operator">&lt;</span> minrows<span class="token punctuation">)</span>
    targrows <span class="token operator">=</span> minrows<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u786E\u5B9A\u9700\u8981\u91C7\u6837\u591A\u5C11\u884C\u6570\u636E\u540E\uFF0C\u5185\u6838\u4EE3\u7801\u5206\u914D\u4E86\u4E00\u5757\u76F8\u5E94\u957F\u5EA6\u7684\u5143\u7EC4\u6570\u7EC4\uFF0C\u7136\u540E\u5F00\u59CB\u4F7F\u7528 <code>acquirefunc</code> \u51FD\u6570\u6307\u9488\u91C7\u6837\u6570\u636E\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * Acquire the sample rows
 */</span>
rows <span class="token operator">=</span> <span class="token punctuation">(</span>HeapTuple <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">palloc</span><span class="token punctuation">(</span>targrows <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>HeapTuple<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">pgstat_progress_update_param</span><span class="token punctuation">(</span>PROGRESS_ANALYZE_PHASE<span class="token punctuation">,</span>
                             inh <span class="token operator">?</span> PROGRESS_ANALYZE_PHASE_ACQUIRE_SAMPLE_ROWS_INH <span class="token operator">:</span>
                             PROGRESS_ANALYZE_PHASE_ACQUIRE_SAMPLE_ROWS<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>inh<span class="token punctuation">)</span>
    numrows <span class="token operator">=</span> <span class="token function">acquire_inherited_sample_rows</span><span class="token punctuation">(</span>onerel<span class="token punctuation">,</span> elevel<span class="token punctuation">,</span>
                                            rows<span class="token punctuation">,</span> targrows<span class="token punctuation">,</span>
                                            <span class="token operator">&amp;</span>totalrows<span class="token punctuation">,</span> <span class="token operator">&amp;</span>totaldeadrows<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    numrows <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>acquirefunc<span class="token punctuation">)</span> <span class="token punctuation">(</span>onerel<span class="token punctuation">,</span> elevel<span class="token punctuation">,</span>
                              rows<span class="token punctuation">,</span> targrows<span class="token punctuation">,</span>
                              <span class="token operator">&amp;</span>totalrows<span class="token punctuation">,</span> <span class="token operator">&amp;</span>totaldeadrows<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u51FD\u6570\u6307\u9488\u6307\u5411\u7684\u662F <code>analyze_rel()</code> \u51FD\u6570\u4E2D\u8BBE\u7F6E\u597D\u7684 <code>acquire_sample_rows()</code> \u51FD\u6570\u3002\u8BE5\u51FD\u6570\u4F7F\u7528\u4E24\u9636\u6BB5\u6A21\u5F0F\u5BF9\u8868\u4E2D\u7684\u6570\u636E\u8FDB\u884C\u91C7\u6837\uFF1A</p><ul><li>\u9636\u6BB5 1\uFF1A\u968F\u673A\u9009\u62E9\u5305\u542B\u76EE\u6807\u91C7\u6837\u884C\u6570\u7684\u6570\u636E\u5757</li><li>\u9636\u6BB5 2\uFF1A\u5BF9\u6BCF\u4E00\u4E2A\u6570\u636E\u5757\u4F7F\u7528 Vitter \u7B97\u6CD5\u6309\u884C\u968F\u673A\u91C7\u6837\u6570\u636E</li></ul><p>\u4E24\u9636\u6BB5\u540C\u65F6\u8FDB\u884C\u3002\u5728\u91C7\u6837\u5B8C\u6210\u540E\uFF0C\u88AB\u91C7\u6837\u5230\u7684\u5143\u7EC4\u5E94\u8BE5\u5DF2\u7ECF\u88AB\u653E\u7F6E\u5728\u5143\u7EC4\u6570\u7EC4\u4E2D\u4E86\u3002\u5BF9\u8FD9\u4E2A\u5143\u7EC4\u6570\u7EC4\u6309\u7167\u5143\u7EC4\u7684\u4F4D\u7F6E\u8FDB\u884C\u5FEB\u901F\u6392\u5E8F\uFF0C\u5E76\u4F7F\u7528\u8FD9\u4E9B\u91C7\u6837\u5230\u7684\u6570\u636E\u4F30\u7B97\u6574\u4E2A\u8868\u4E2D\u7684\u5B58\u6D3B\u5143\u7EC4\u4E0E\u6B7B\u5143\u7EC4\u7684\u4E2A\u6570\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * acquire_sample_rows -- acquire a random sample of rows from the table
 *
 * Selected rows are returned in the caller-allocated array rows[], which
 * must have at least targrows entries.
 * The actual number of rows selected is returned as the function result.
 * We also estimate the total numbers of live and dead rows in the table,
 * and return them into *totalrows and *totaldeadrows, respectively.
 *
 * The returned list of tuples is in order by physical position in the table.
 * (We will rely on this later to derive correlation estimates.)
 *
 * As of May 2004 we use a new two-stage method:  Stage one selects up
 * to targrows random blocks (or all blocks, if there aren&#39;t so many).
 * Stage two scans these blocks and uses the Vitter algorithm to create
 * a random sample of targrows rows (or less, if there are less in the
 * sample of blocks).  The two stages are executed simultaneously: each
 * block is processed as soon as stage one returns its number and while
 * the rows are read stage two controls which ones are to be inserted
 * into the sample.
 *
 * Although every row has an equal chance of ending up in the final
 * sample, this sampling method is not perfect: not every possible
 * sample has an equal chance of being selected.  For large relations
 * the number of different blocks represented by the sample tends to be
 * too small.  We can live with that for now.  Improvements are welcome.
 *
 * An important property of this sampling method is that because we do
 * look at a statistically unbiased set of blocks, we should get
 * unbiased estimates of the average numbers of live and dead rows per
 * block.  The previous sampling method put too much credence in the row
 * density near the start of the table.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">int</span>
<span class="token function">acquire_sample_rows</span><span class="token punctuation">(</span>Relation onerel<span class="token punctuation">,</span> <span class="token keyword">int</span> elevel<span class="token punctuation">,</span>
                    HeapTuple <span class="token operator">*</span>rows<span class="token punctuation">,</span> <span class="token keyword">int</span> targrows<span class="token punctuation">,</span>
                    <span class="token keyword">double</span> <span class="token operator">*</span>totalrows<span class="token punctuation">,</span> <span class="token keyword">double</span> <span class="token operator">*</span>totaldeadrows<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">/* Outer loop over blocks to sample */</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">BlockSampler_HasMore</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>bs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        bool        block_accepted<span class="token punctuation">;</span>
        BlockNumber targblock <span class="token operator">=</span> <span class="token function">BlockSampler_Next</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>bs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>

    <span class="token comment">/*
     * If we didn&#39;t find as many tuples as we wanted then we&#39;re done. No sort
     * is needed, since they&#39;re already in order.
     *
     * Otherwise we need to sort the collected tuples by position
     * (itempointer). It&#39;s not worth worrying about corner cases where the
     * tuples are already sorted.
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numrows <span class="token operator">==</span> targrows<span class="token punctuation">)</span>
        <span class="token function">qsort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span> rows<span class="token punctuation">,</span> numrows<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>HeapTuple<span class="token punctuation">)</span><span class="token punctuation">,</span> compare_rows<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
     * Estimate total numbers of live and dead rows in relation, extrapolating
     * on the assumption that the average tuple density in pages we didn&#39;t
     * scan is the same as in the pages we did scan.  Since what we scanned is
     * a random sample of the pages in the relation, this should be a good
     * assumption.
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bs<span class="token punctuation">.</span>m <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token operator">*</span>totalrows <span class="token operator">=</span> <span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>liverows <span class="token operator">/</span> bs<span class="token punctuation">.</span>m<span class="token punctuation">)</span> <span class="token operator">*</span> totalblocks <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>totaldeadrows <span class="token operator">=</span> <span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>deadrows <span class="token operator">/</span> bs<span class="token punctuation">.</span>m<span class="token punctuation">)</span> <span class="token operator">*</span> totalblocks <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token operator">*</span>totalrows <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>totaldeadrows <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u56DE\u5230 <code>do_analyze_rel()</code> \u51FD\u6570\u3002\u91C7\u6837\u5230\u6570\u636E\u4EE5\u540E\uFF0C\u5BF9\u4E8E\u8981\u5206\u6790\u7684\u6BCF\u4E00\u4E2A\u5217\uFF0C\u5206\u522B\u8BA1\u7B97\u7EDF\u8BA1\u6570\u636E\uFF0C\u7136\u540E\u66F4\u65B0 <code>pg_statistic</code> \u7CFB\u7EDF\u8868\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * Compute the statistics.  Temporary results during the calculations for
 * each column are stored in a child context.  The calc routines are
 * responsible to make sure that whatever they store into the VacAttrStats
 * structure is allocated in anl_context.
 */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>numrows <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> attr_cnt<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        VacAttrStats <span class="token operator">*</span>stats <span class="token operator">=</span> vacattrstats<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        AttributeOpts <span class="token operator">*</span>aopt<span class="token punctuation">;</span>

        stats<span class="token operator">-&gt;</span>rows <span class="token operator">=</span> rows<span class="token punctuation">;</span>
        stats<span class="token operator">-&gt;</span>tupDesc <span class="token operator">=</span> onerel<span class="token operator">-&gt;</span>rd_att<span class="token punctuation">;</span>
        stats<span class="token operator">-&gt;</span><span class="token function">compute_stats</span><span class="token punctuation">(</span>stats<span class="token punctuation">,</span>
                             std_fetch_func<span class="token punctuation">,</span>
                             numrows<span class="token punctuation">,</span>
                             totalrows<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>

    <span class="token comment">/*
     * Emit the completed stats rows into pg_statistic, replacing any
     * previous statistics for the target columns.  (If there are stats in
     * pg_statistic for columns we didn&#39;t process, we leave them alone.)
     */</span>
    <span class="token function">update_attstats</span><span class="token punctuation">(</span><span class="token function">RelationGetRelid</span><span class="token punctuation">(</span>onerel<span class="token punctuation">)</span><span class="token punctuation">,</span> inh<span class="token punctuation">,</span>
                    attr_cnt<span class="token punctuation">,</span> vacattrstats<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u663E\u7136\uFF0C\u5BF9\u4E8E\u4E0D\u540C\u7C7B\u578B\u7684\u5217\uFF0C\u5176 <code>compute_stats</code> \u51FD\u6570\u6307\u9488\u6307\u5411\u7684\u8BA1\u7B97\u51FD\u6570\u80AF\u5B9A\u4E0D\u592A\u4E00\u6837\u3002\u6240\u4EE5\u6211\u4EEC\u4E0D\u59A8\u770B\u770B\u7ED9\u8FD9\u4E2A\u51FD\u6570\u6307\u9488\u8D4B\u503C\u7684\u5730\u65B9\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 * std_typanalyze -- the default type-specific typanalyze function
 */</span>
bool
<span class="token function">std_typanalyze</span><span class="token punctuation">(</span>VacAttrStats <span class="token operator">*</span>stats<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">/*
     * Determine which standard statistics algorithm to use
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">OidIsValid</span><span class="token punctuation">(</span>eqopr<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">OidIsValid</span><span class="token punctuation">(</span>ltopr<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* Seems to be a scalar datatype */</span>
        stats<span class="token operator">-&gt;</span>compute_stats <span class="token operator">=</span> compute_scalar_stats<span class="token punctuation">;</span>
        <span class="token comment">/*--------------------
         * The following choice of minrows is based on the paper
         * &quot;Random sampling for histogram construction: how much is enough?&quot;
         * by Surajit Chaudhuri, Rajeev Motwani and Vivek Narasayya, in
         * Proceedings of ACM SIGMOD International Conference on Management
         * of Data, 1998, Pages 436-447.  Their Corollary 1 to Theorem 5
         * says that for table size n, histogram size k, maximum relative
         * error in bin size f, and error probability gamma, the minimum
         * random sample size is
         *      r = 4 * k * ln(2*n/gamma) / f^2
         * Taking f = 0.5, gamma = 0.01, n = 10^6 rows, we obtain
         *      r = 305.82 * k
         * Note that because of the log function, the dependence on n is
         * quite weak; even at n = 10^12, a 300*k sample gives &lt;= 0.66
         * bin size error with probability 0.99.  So there&#39;s no real need to
         * scale for n, which is a good thing because we don&#39;t necessarily
         * know it at this point.
         *--------------------
         */</span>
        stats<span class="token operator">-&gt;</span>minrows <span class="token operator">=</span> <span class="token number">300</span> <span class="token operator">*</span> attr<span class="token operator">-&gt;</span>attstattarget<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">OidIsValid</span><span class="token punctuation">(</span>eqopr<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* We can still recognize distinct values */</span>
        stats<span class="token operator">-&gt;</span>compute_stats <span class="token operator">=</span> compute_distinct_stats<span class="token punctuation">;</span>
        <span class="token comment">/* Might as well use the same minrows as above */</span>
        stats<span class="token operator">-&gt;</span>minrows <span class="token operator">=</span> <span class="token number">300</span> <span class="token operator">*</span> attr<span class="token operator">-&gt;</span>attstattarget<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* Can&#39;t do much but the trivial stuff */</span>
        stats<span class="token operator">-&gt;</span>compute_stats <span class="token operator">=</span> compute_trivial_stats<span class="token punctuation">;</span>
        <span class="token comment">/* Might as well use the same minrows as above */</span>
        stats<span class="token operator">-&gt;</span>minrows <span class="token operator">=</span> <span class="token number">300</span> <span class="token operator">*</span> attr<span class="token operator">-&gt;</span>attstattarget<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u6761\u4EF6\u5224\u65AD\u8BED\u53E5\u53EF\u4EE5\u88AB\u89E3\u8BFB\u4E3A\uFF1A</p><ul><li>\u5982\u679C\u8BF4\u4E00\u4E2A\u5217\u7684\u6570\u636E\u7C7B\u578B\u652F\u6301\u9ED8\u8BA4\u7684 <code>=</code>\uFF08<code>eqopr</code>\uFF1Aequals operator\uFF09\u548C <code>&lt;</code>\uFF08<code>ltopr</code>\uFF1Aless than operator\uFF09\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u5217\u5E94\u8BE5\u662F\u4E00\u4E2A\u6570\u503C\u7C7B\u578B\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>compute_scalar_stats()</code> \u51FD\u6570\u8FDB\u884C\u5206\u6790</li><li>\u5982\u679C\u5217\u7684\u6570\u636E\u7C7B\u578B\u53EA\u652F\u6301 <code>=</code> \u8FD0\u7B97\u7B26\uFF0C\u90A3\u4E48\u4F9D\u65E7\u8FD8\u53EF\u4EE5\u4F7F\u7528 <code>compute_distinct_stats</code> \u8FDB\u884C\u552F\u4E00\u503C\u7684\u7EDF\u8BA1\u5206\u6790</li><li>\u5982\u679C\u90FD\u4E0D\u884C\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u5217\u53EA\u80FD\u4F7F\u7528 <code>compute_trivial_stats</code> \u8FDB\u884C\u4E00\u4E9B\u7B80\u5355\u7684\u5206\u6790</li></ul><p>\u6211\u4EEC\u53EF\u4EE5\u5206\u522B\u770B\u770B\u8FD9\u4E09\u4E2A\u5206\u6790\u51FD\u6570\u91CC\u505A\u4E86\u5565\uFF0C\u4F46\u6211\u4E0D\u51C6\u5907\u6DF1\u5165\u6BCF\u4E00\u4E2A\u5206\u6790\u51FD\u6570\u89E3\u8BFB\u5176\u4E2D\u7684\u903B\u8F91\u4E86\u3002\u56E0\u4E3A\u5176\u4E2D\u7684\u601D\u60F3\u57FA\u4E8E\u4E00\u4E9B\u5F88\u53E4\u65E9\u7684\u7EDF\u8BA1\u5B66\u8BBA\u6587\uFF0C\u53E4\u65E9\u5230\u8FDE PDF \u4E0A\u7684\u5B57\u6BCD\u90FD\u5FEB\u770B\u4E0D\u6E05\u4E86\u3002\u5728\u4EE3\u7801\u4E0A\u6CA1\u6709\u7279\u522B\u5927\u7684\u53EF\u8BFB\u6027\uFF0C\u56E0\u4E3A\u57FA\u672C\u662F\u53C2\u7167\u8BBA\u6587\u4E2D\u7684\u516C\u5F0F\u5B9E\u73B0\u7684\uFF0C\u4E0D\u770B\u8BBA\u6587\u6839\u672C\u6CA1\u6CD5\u7406\u89E3\u53D8\u91CF\u548C\u516C\u5F0F\u7684\u542B\u4E49\u3002</p><h3 id="compute-trivial-stats" tabindex="-1"><a class="header-anchor" href="#compute-trivial-stats" aria-hidden="true">#</a> compute_trivial_stats</h3><p>\u5982\u679C\u67D0\u4E2A\u5217\u7684\u6570\u636E\u7C7B\u578B\u4E0D\u652F\u6301\u7B49\u503C\u8FD0\u7B97\u7B26\u548C\u6BD4\u8F83\u8FD0\u7B97\u7B26\uFF0C\u90A3\u4E48\u5C31\u53EA\u80FD\u8FDB\u884C\u4E00\u4E9B\u7B80\u5355\u7684\u5206\u6790\uFF0C\u6BD4\u5982\uFF1A</p><ul><li>\u975E\u7A7A\u884C\u7684\u6BD4\u4F8B</li><li>\u5217\u4E2D\u5143\u7EC4\u7684\u5E73\u5747\u5BBD\u5EA6</li></ul><p>\u8FD9\u4E9B\u53EF\u4EE5\u901A\u8FC7\u5BF9\u91C7\u6837\u540E\u7684\u5143\u7EC4\u6570\u7EC4\u8FDB\u884C\u5FAA\u73AF\u904D\u5386\u540E\u8F7B\u677E\u5F97\u5230\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 *  compute_trivial_stats() -- compute very basic column statistics
 *
 *  We use this when we cannot find a hash &quot;=&quot; operator for the datatype.
 *
 *  We determine the fraction of non-null rows and the average datum width.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span>
<span class="token function">compute_trivial_stats</span><span class="token punctuation">(</span>VacAttrStatsP stats<span class="token punctuation">,</span>
                      AnalyzeAttrFetchFunc fetchfunc<span class="token punctuation">,</span>
                      <span class="token keyword">int</span> samplerows<span class="token punctuation">,</span>
                      <span class="token keyword">double</span> totalrows<span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="compute-distinct-stats" tabindex="-1"><a class="header-anchor" href="#compute-distinct-stats" aria-hidden="true">#</a> compute_distinct_stats</h3><p>\u5982\u679C\u67D0\u4E2A\u5217\u53EA\u652F\u6301\u7B49\u503C\u8FD0\u7B97\u7B26\uFF0C\u4E5F\u5C31\u662F\u8BF4\u6211\u4EEC\u53EA\u80FD\u77E5\u9053\u4E00\u4E2A\u6570\u503C <strong>\u662F\u4EC0\u4E48</strong>\uFF0C\u4F46\u4E0D\u80FD\u548C\u5176\u5B83\u6570\u503C\u6BD4\u5927\u5C0F\u3002\u6240\u4EE5\u65E0\u6CD5\u5206\u6790\u6570\u503C\u5728\u5927\u5C0F\u8303\u56F4\u4E0A\u7684\u5206\u5E03\uFF0C\u53EA\u80FD\u5206\u6790\u6570\u503C\u5728\u51FA\u73B0\u9891\u7387\u4E0A\u7684\u5206\u5E03\u3002\u6240\u4EE5\u8BE5\u51FD\u6570\u5206\u6790\u7684\u7EDF\u8BA1\u6570\u636E\u5305\u542B\uFF1A</p><ul><li>\u975E\u7A7A\u884C\u7684\u6BD4\u4F8B</li><li>\u5217\u4E2D\u5143\u7EC4\u7684\u5E73\u5747\u5BBD\u5EA6</li><li>\u6700\u9891\u7E41\u51FA\u73B0\u7684\u503C\uFF08MCV\uFF09</li><li>\uFF08\u4F30\u7B97\u7684\uFF09\u552F\u4E00\u503C\u4E2A\u6570</li></ul><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 *  compute_distinct_stats() -- compute column statistics including ndistinct
 *
 *  We use this when we can find only an &quot;=&quot; operator for the datatype.
 *
 *  We determine the fraction of non-null rows, the average width, the
 *  most common values, and the (estimated) number of distinct values.
 *
 *  The most common values are determined by brute force: we keep a list
 *  of previously seen values, ordered by number of times seen, as we scan
 *  the samples.  A newly seen value is inserted just after the last
 *  multiply-seen value, causing the bottommost (oldest) singly-seen value
 *  to drop off the list.  The accuracy of this method, and also its cost,
 *  depend mainly on the length of the list we are willing to keep.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span>
<span class="token function">compute_distinct_stats</span><span class="token punctuation">(</span>VacAttrStatsP stats<span class="token punctuation">,</span>
                       AnalyzeAttrFetchFunc fetchfunc<span class="token punctuation">,</span>
                       <span class="token keyword">int</span> samplerows<span class="token punctuation">,</span>
                       <span class="token keyword">double</span> totalrows<span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="compute-scalar-stats" tabindex="-1"><a class="header-anchor" href="#compute-scalar-stats" aria-hidden="true">#</a> compute_scalar_stats</h3><p>\u5982\u679C\u4E00\u4E2A\u5217\u7684\u6570\u636E\u7C7B\u578B\u652F\u6301\u7B49\u503C\u8FD0\u7B97\u7B26\u548C\u6BD4\u8F83\u8FD0\u7B97\u7B26\uFF0C\u90A3\u4E48\u53EF\u4EE5\u8FDB\u884C\u6700\u8BE6\u5C3D\u7684\u5206\u6790\u3002\u5206\u6790\u76EE\u6807\u5305\u542B\uFF1A</p><ul><li>\u975E\u7A7A\u884C\u7684\u6BD4\u4F8B</li><li>\u5217\u4E2D\u5143\u7EC4\u7684\u5E73\u5747\u5BBD\u5EA6</li><li>\u6700\u9891\u7E41\u51FA\u73B0\u7684\u503C\uFF08MCV\uFF09</li><li>\uFF08\u4F30\u7B97\u7684\uFF09\u552F\u4E00\u503C\u4E2A\u6570</li><li>\u6570\u636E\u5206\u5E03\u76F4\u65B9\u56FE</li><li>\u7269\u7406\u548C\u903B\u8F91\u4F4D\u7F6E\u7684\u76F8\u5173\u6027</li></ul><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
 *  compute_distinct_stats() -- compute column statistics including ndistinct
 *
 *  We use this when we can find only an &quot;=&quot; operator for the datatype.
 *
 *  We determine the fraction of non-null rows, the average width, the
 *  most common values, and the (estimated) number of distinct values.
 *
 *  The most common values are determined by brute force: we keep a list
 *  of previously seen values, ordered by number of times seen, as we scan
 *  the samples.  A newly seen value is inserted just after the last
 *  multiply-seen value, causing the bottommost (oldest) singly-seen value
 *  to drop off the list.  The accuracy of this method, and also its cost,
 *  depend mainly on the length of the list we are willing to keep.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span>
<span class="token function">compute_distinct_stats</span><span class="token punctuation">(</span>VacAttrStatsP stats<span class="token punctuation">,</span>
                       AnalyzeAttrFetchFunc fetchfunc<span class="token punctuation">,</span>
                       <span class="token keyword">int</span> samplerows<span class="token punctuation">,</span>
                       <span class="token keyword">double</span> totalrows<span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> Summary</h2><p>\u4EE5 PostgreSQL \u4F18\u5316\u5668\u9700\u8981\u7684\u7EDF\u8BA1\u4FE1\u606F\u4E3A\u5207\u5165\u70B9\uFF0C\u5206\u6790\u4E86 <code>ANALYZE</code> \u547D\u4EE4\u7684\u5927\u81F4\u6267\u884C\u6D41\u7A0B\u3002\u51FA\u4E8E\u7B80\u6D01\u6027\uFF0C\u5728\u6D41\u7A0B\u5206\u6790\u4E0A\u6CA1\u6709\u8986\u76D6\u5404\u79CD corner case \u548C\u76F8\u5173\u7684\u5904\u7406\u903B\u8F91\u3002</p><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2>`,80),m={href:"https://www.postgresql.org/docs/current/sql-analyze.html",target:"_blank",rel:"noopener noreferrer"},k=a("PostgreSQL 14 Documentation: ANALYZE"),b={href:"https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-STATISTICS",target:"_blank",rel:"noopener noreferrer"},h=a("PostgreSQL 14 Documentation: 25.1. Routine Vacuuming"),g={href:"https://www.postgresql.org/docs/current/planner-stats.html",target:"_blank",rel:"noopener noreferrer"},f=a("PostgreSQL 14 Documentation: 14.2. Statistics Used by the Planner"),w={href:"https://www.postgresql.org/docs/current/catalog-pg-statistic.html",target:"_blank",rel:"noopener noreferrer"},y=a("PostgreSQL 14 Documentation: 52.49. pg_statistic"),_={href:"http://mysql.taobao.org/monthly/2016/05/09/",target:"_blank",rel:"noopener noreferrer"},T=a("\u963F\u91CC\u4E91\u6570\u636E\u5E93\u5185\u6838\u6708\u62A5 2016/05\uFF1APostgreSQL \u7279\u6027\u5206\u6790 \u7EDF\u8BA1\u4FE1\u606F\u8BA1\u7B97\u65B9\u6CD5");function A(o,x){const i=t("ArticleInfo"),e=t("ExternalLinkIcon");return p(),c("div",null,[u,s(i,{frontmatter:o.$frontmatter},null,8,["frontmatter"]),v,n("p",null,[n("a",m,[k,s(e)])]),n("p",null,[n("a",b,[h,s(e)])]),n("p",null,[n("a",g,[f,s(e)])]),n("p",null,[n("a",w,[y,s(e)])]),n("p",null,[n("a",_,[T,s(e)])])])}var q=l(d,[["render",A],["__file","analyze.html.vue"]]);export{q as default};
