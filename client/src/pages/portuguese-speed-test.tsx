import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Globe } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";

export default function PortugueseSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Teste de Velocidade da Internet - Medidor de Velocidade WiFi Grátis 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Teste de velocidade da internet grátis em português. Meça sua velocidade de download, upload e ping para provedores no Brasil. Resultados precisos em tempo real para Vivo, Claro, TIM, Oi e mais.');
    }

    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'pt-BR');

    setCanonicalHref('https://speedtestboost.com/pt-br');

    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    const hreflangEn = document.createElement('link');
    hreflangEn.setAttribute('rel', 'alternate');
    hreflangEn.setAttribute('hreflang', 'en');
    hreflangEn.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangEn);

    const hreflangEs = document.createElement('link');
    hreflangEs.setAttribute('rel', 'alternate');
    hreflangEs.setAttribute('hreflang', 'es');
    hreflangEs.setAttribute('href', 'https://speedtestboost.com/es');
    document.head.appendChild(hreflangEs);

    const hreflangId = document.createElement('link');
    hreflangId.setAttribute('rel', 'alternate');
    hreflangId.setAttribute('hreflang', 'id');
    hreflangId.setAttribute('href', 'https://speedtestboost.com/id');
    document.head.appendChild(hreflangId);

    const hreflangPtBr = document.createElement('link');
    hreflangPtBr.setAttribute('rel', 'alternate');
    hreflangPtBr.setAttribute('hreflang', 'pt-BR');
    hreflangPtBr.setAttribute('href', 'https://speedtestboost.com/pt-br');
    document.head.appendChild(hreflangPtBr);

    const hreflangFr = document.createElement('link');
    hreflangFr.setAttribute('rel', 'alternate');
    hreflangFr.setAttribute('hreflang', 'fr');
    hreflangFr.setAttribute('href', 'https://speedtestboost.com/fr');
    document.head.appendChild(hreflangFr);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangDefault);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Teste de Velocidade da Internet - Português Brasil",
      "description": "Teste de velocidade da internet grátis em português para medir sua conexão WiFi e fibra óptica no Brasil",
      "url": "https://speedtestboost.com/pt-br",
      "inLanguage": "pt-BR",
      "about": {
        "@type": "Thing",
        "name": "Internet Speed Test",
        "description": "Ferramenta gratuita para medir velocidade da internet em português brasileiro"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/pt-br" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Teste de Velocidade", href: "/pt-br" }]} />
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Teste de Velocidade da Internet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Meça a <span className="font-semibold text-primary">velocidade da sua internet</span> grátis. Teste sua conexão WiFi, fibra óptica ou dados móveis com resultados precisos em tempo real.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-testid="button-start-test-pt-br"
              >
                <Zap className="mr-2 h-5 w-5" />
                Iniciar Teste de Velocidade
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Teste de Velocidade da Internet no Brasil</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Nosso teste de velocidade da internet é a ferramenta mais precisa e confiável para medir o desempenho da sua conexão no Brasil. Com mais de 183 milhões de usuários de internet e 52 milhões de conexões de banda larga fixa no país, fornecemos medições exatas de velocidade de download, velocidade de upload, latência (ping) e estabilidade de conexão para todos os principais provedores de serviços de internet do Brasil.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Por Que Fazer um Teste de Velocidade?</h3>
                <p className="text-muted-foreground">
                  Um teste de velocidade da internet permite verificar se você está recebendo a velocidade contratada com seu provedor. No Brasil, operadoras como Vivo, Claro, TIM e Oi oferecem fibra óptica (FTTH) de até 1 Gbps, e é essencial confirmar o desempenho real. A Vivo lidera o mercado de fibra com 5,7 milhões de conexões FTTH, enquanto a Claro detém cerca de 20,6% do mercado de banda larga fixa. A TIM tem expandido rapidamente sua cobertura 5G, alcançando 64% da população em maio de 2025. Além disso, milhares de ISPs regionais menores representam mais de 52% do mercado brasileiro, oferecendo serviços especializados em áreas específicas.
                </p>

                <h3 className="text-xl font-semibold mb-3">Como Funciona o Teste de Velocidade?</h3>
                <p className="text-muted-foreground">
                  Nossa ferramenta de teste de velocidade funciona conectando-se aos servidores mais próximos da sua localização no Brasil para fornecer resultados precisos. O teste mede três métricas principais: velocidade de download (quantos dados você pode receber por segundo), velocidade de upload (quantos dados você pode enviar por segundo) e ping/latência (o tempo de resposta da sua conexão). A velocidade média de banda larga fixa no Brasil é de 183,56 Mbps, um aumento significativo em relação aos 165,59 Mbps registrados em 2024.
                </p>

                <h3 className="text-xl font-semibold mb-3">Principais Provedores de Internet no Brasil</h3>
                <p className="text-muted-foreground">
                  O mercado brasileiro de internet é caracterizado por uma mistura de grandes operadoras nacionais e milhares de provedores regionais menores. As principais operadoras incluem:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Vivo (Telefônica Brasil)</strong> - Líder em fibra óptica com 14-17% do mercado de banda larga fixa e 36,63% do mercado móvel. Oferece velocidades de até 1 Gbps em suas conexões FTTH.</li>
                  <li><strong>Claro</strong> - Maior operadora individual com 20,6% do mercado de banda larga fixa e 34,83% do mercado móvel. Forte presença em áreas urbanas com tecnologia de fibra e cabo.</li>
                  <li><strong>TIM Brasil</strong> - Detém 5-7% do mercado de banda larga fixa e 24,94% do mercado móvel. Destaca-se pela expansão agressiva de 5G e cobertura nacional.</li>
                  <li><strong>Oi</strong> - Possui 10-11% do mercado de banda larga fixa. Vendeu sua operação de fibra para a V.tal, que agora fornece infraestrutura para provedores menores.</li>
                  <li><strong>Sky Brasil</strong> - 3-5% do mercado, migrando do foco em TV paga para serviços de banda larga.</li>
                  <li><strong>ISPs Regionais</strong> - Coletivamente representam mais de 52% do mercado, incluindo empresas como Desktop, Vero, Unifique, Brisanet e Alloha. Esses provedores locais capturam 64% dos investimentos em banda larga de 2024 e lideram em áreas rurais e suburbanas.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Entendendo os Resultados do Teste</h3>
                <p className="text-muted-foreground">
                  Após executar o teste de velocidade, você verá três métricas principais:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Velocidade de Download</strong> - Medida em Mbps (megabits por segundo), indica a rapidez com que você pode receber dados da internet. No Brasil, a velocidade média contratada é de 440 Mbps segundo dados da Anatel, mas a velocidade real pode variar.</li>
                  <li><strong>Velocidade de Upload</strong> - Também medida em Mbps, mostra a rapidez com que você pode enviar dados para a internet. Importante para videochamadas, streaming ao vivo e upload de arquivos.</li>
                  <li><strong>Ping/Latência</strong> - Medida em milissegundos (ms), representa o tempo de resposta da sua conexão. Valores abaixo de 60 ms são excelentes para jogos online e videoconferências.</li>
                  <li><strong>Jitter</strong> - Mede a variação no tempo de resposta, indicando a estabilidade da conexão. Valores baixos de jitter são importantes para VoIP e streaming de vídeo.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Tecnologias de Internet no Brasil</h3>
                <p className="text-muted-foreground">
                  O Brasil tem visto uma rápida modernização de sua infraestrutura de internet. A fibra óptica (FTTH - Fiber to the Home) ultrapassou o DSL em 2019 e agora domina o mercado de banda larga fixa. A tecnologia 5G está se expandindo rapidamente, com a TIM alcançando 64% de cobertura populacional até maio de 2025. Para áreas rurais, soluções como Fixed Wireless Access (FWA) e internet via satélite (Starlink, Hughes) estão ganhando tração. A implementação de Open-RAN em projetos piloto mostrou economia de 30% em CAPEX para implantações rurais.
                </p>

                <h3 className="text-xl font-semibold mb-3">Dicas para Melhorar Sua Velocidade de Internet</h3>
                <p className="text-muted-foreground">
                  Se seus resultados de teste de velocidade estiverem abaixo do esperado, tente estas soluções:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Reinicie seu modem e roteador WiFi</li>
                  <li>Conecte-se via cabo Ethernet em vez de WiFi para resultados mais estáveis</li>
                  <li>Feche aplicativos e dispositivos não utilizados que possam estar consumindo largura de banda</li>
                  <li>Posicione seu roteador em um local central e elevado</li>
                  <li>Atualize o firmware do seu roteador para a versão mais recente</li>
                  <li>Considere atualizar para um plano de maior velocidade se suas necessidades aumentaram</li>
                  <li>Verifique se há interferências de outros dispositivos eletrônicos</li>
                  <li>Entre em contato com seu provedor se a velocidade estiver consistentemente abaixo do contratado</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Internet Móvel vs. Banda Larga Fixa</h3>
                <p className="text-muted-foreground">
                  No Brasil, a velocidade média de internet móvel é de aproximadamente 80+ Mbps, um aumento de 71,9% em relação a janeiro de 2024. A banda larga fixa, por outro lado, oferece velocidades médias de 183,56 Mbps. A escolha entre móvel e fixa depende das suas necessidades: a internet móvel oferece flexibilidade e mobilidade, enquanto a banda larga fixa geralmente fornece conexões mais estáveis e rápidas para uso doméstico, especialmente com tecnologia FTTH.
                </p>

                <h3 className="text-xl font-semibold mb-3">Regulamentação e Qualidade de Serviço</h3>
                <p className="text-muted-foreground">
                  A Anatel (Agência Nacional de Telecomunicações) é o órgão regulador responsável pela qualidade dos serviços de internet no Brasil. Segundo as regulamentações da Anatel, os provedores devem entregar pelo menos 80% da velocidade contratada em conexões fixas. Se você consistentemente recebe velocidades abaixo desse patamar, tem o direito de reportar o problema à Anatel e solicitar correção ou compensação do seu provedor.
                </p>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Para obter resultados de teste mais precisos, recomendamos executar o teste várias vezes em diferentes horários do dia, pois a velocidade pode variar dependendo do congestionamento da rede. Use uma conexão Ethernet com fio sempre que possível e feche outros aplicativos que possam estar usando a internet durante o teste.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <GenericFooter />

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
