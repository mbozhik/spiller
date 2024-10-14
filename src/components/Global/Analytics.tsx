import NextScript from 'next/script'

export default function Analytics() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <NextScript id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PSNNWQC7');
            `}
          </NextScript>

          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PSNNWQC7" height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
          </noscript>

          <NextScript
            id="yandex_metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for(j=0;j<document.scripts.length;j++){
                    if(document.scripts[j].src===r)return
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

                ym(96197419,'init',{
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
            }}
          />
        </>
      )}
    </>
  )
}
