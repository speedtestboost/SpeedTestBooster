import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Globe } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";

export default function FrenchSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Test de Vitesse Internet - Testez Votre Connexion WiFi Gratuit 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test de vitesse internet gratuit en français. Mesurez votre vitesse de téléchargement, upload et ping pour les fournisseurs au Canada et en France. Résultats précis en temps réel pour Bell, Rogers, Bouygues et plus.');
    }

    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'fr');

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/fr';


    document.head.appendChild(canonical);

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
      "name": "Test de Vitesse Internet - Français",
      "description": "Test de vitesse internet gratuit en français pour mesurer votre connexion WiFi et fibre optique au Canada et en France",
      "url": "https://speedtestboost.com/fr",
      "inLanguage": "fr",
      "about": {
        "@type": "Thing",
        "name": "Internet Speed Test",
        "description": "Outil gratuit pour mesurer la vitesse internet en français"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
      
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/fr" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Test de Vitesse Français", href: "/fr" }]} />
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Test de Vitesse Internet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Mesurez la <span className="font-semibold text-primary">vitesse de votre internet</span> gratuitement. Testez votre connexion WiFi, fibre optique ou données mobiles avec des résultats précis en temps réel.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-testid="button-start-test-fr"
              >
                <Zap className="mr-2 h-5 w-5" />
                Démarrer le Test de Vitesse
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Test de Vitesse Internet au Canada et en France</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Notre test de vitesse internet est l'outil le plus précis et fiable pour mesurer les performances de votre connexion dans les régions francophones. Avec une couverture spécialisée pour le Canada (Québec et provinces francophones) et la France, nous fournissons des mesures exactes de vitesse de téléchargement, vitesse d'upload, latence (ping) et stabilité de connexion pour tous les principaux fournisseurs de services internet.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Pourquoi Effectuer un Test de Vitesse?</h3>
                <p className="text-muted-foreground">
                  Un test de vitesse internet vous permet de vérifier si vous recevez la vitesse promise par votre fournisseur. Au Canada, où des opérateurs comme Bell, Rogers, TELUS et Shaw offrent la fibre optique jusqu'à 1,5 Gbps, il est essentiel de confirmer les performances réelles. Bell Fibe, par exemple, propose des vitesses symétriques allant jusqu'à 8 Gbps dans certaines régions. En France, des fournisseurs comme Orange, Free, SFR et Bouygues Telecom se disputent le marché avec des offres de fibre optique FTTH offrant jusqu'à 8 Gbps. Le Québec bénéficie d'une infrastructure moderne grâce aux investissements du CRTC pour l'internet haute vitesse dans les régions rurales.
                </p>

                <h3 className="text-xl font-semibold mb-3">Comment Fonctionne le Test de Vitesse?</h3>
                <p className="text-muted-foreground">
                  Notre outil de test de vitesse fonctionne en se connectant aux serveurs les plus proches de votre emplacement au Canada ou en France pour fournir des résultats précis. Le test mesure trois métriques principales: la vitesse de téléchargement (combien de données vous pouvez recevoir par seconde), la vitesse d'upload (combien de données vous pouvez envoyer par seconde) et le ping/latence (le temps de réponse de votre connexion). Les résultats vous aident à diagnostiquer les problèmes de performance et à déterminer si vous obtenez la valeur pour laquelle vous payez.
                </p>

                <h3 className="text-xl font-semibold mb-3">Principaux Fournisseurs Internet au Canada</h3>
                <p className="text-muted-foreground">
                  Le marché canadien de l'internet est dominé par plusieurs grands opérateurs nationaux et régionaux:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Bell Canada</strong> - Leader national avec Bell Fibe offrant jusqu'à 8 Gbps dans certaines régions. Fort au Québec et en Ontario avec une infrastructure FTTH extensive. Bell possède également Virgin Plus, une marque discount.</li>
                  <li><strong>Rogers Communications</strong> - Deuxième plus grand fournisseur avec des vitesses allant jusqu'à 1,5 Gbps via câble coaxial et fibre hybride. Forte présence en Ontario et dans l'Ouest canadien.</li>
                  <li><strong>TELUS</strong> - Leader dans l'Ouest canadien (Colombie-Britannique, Alberta) avec TELUS PureFibre offrant jusqu'à 3 Gbps. Investit massivement dans l'infrastructure 5G et fibre.</li>
                  <li><strong>Shaw Communications</strong> - Opérateur régional important dans l'Ouest (maintenant fusionné avec Rogers), offrant des vitesses jusqu'à 1,5 Gbps via technologie câble.</li>
                  <li><strong>Vidéotron</strong> - Principal fournisseur au Québec avec des offres compétitives de câble et fibre optique. Leader dans la province francophone.</li>
                  <li><strong>Cogeco</strong> - Fournisseur régional au Québec et en Ontario avec infrastructure câble et fibre.</li>
                  <li><strong>Fournisseurs Indépendants</strong> - TekSavvy, Start.ca, Distributel offrant des prix compétitifs en utilisant l'infrastructure des grands opérateurs.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Principaux Fournisseurs Internet en France</h3>
                <p className="text-muted-foreground">
                  Le marché français de l'internet est l'un des plus avancés d'Europe avec une forte pénétration de la fibre optique:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Orange</strong> - Leader du marché avec environ 42% de parts de marché internet fixe. Offre la fibre optique jusqu'à 8 Gbps et dispose du réseau le plus étendu en France.</li>
                  <li><strong>Free (Iliad)</strong> - Révolutionnaire du marché avec environ 25% de parts. Pionnier des offres low-cost, propose la fibre jusqu'à 8 Gbps avec la Freebox Ultra.</li>
                  <li><strong>SFR (Altice)</strong> - Deuxième opérateur avec environ 23% du marché. Offre des forfaits fibre jusqu'à 8 Gbps et possède un réseau câble étendu.</li>
                  <li><strong>Bouygues Telecom</strong> - Quatrième opérateur avec environ 10% du marché. Propose la fibre optique jusqu'à 8 Gbps et se concentre sur les offres convergentes fixe-mobile.</li>
                  <li><strong>Red by SFR, Sosh (Orange), B&You (Bouygues)</strong> - Marques discount des grands opérateurs offrant des prix compétitifs.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Comprendre les Résultats du Test</h3>
                <p className="text-muted-foreground">
                  Après avoir exécuté le test de vitesse, vous verrez trois métriques principales:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Vitesse de Téléchargement</strong> - Mesurée en Mbps (mégabits par seconde), indique la rapidité avec laquelle vous pouvez recevoir des données d'internet. Au Canada, la vitesse moyenne est d'environ 150-200 Mbps, tandis qu'en France elle dépasse souvent 300 Mbps grâce à la fibre FTTH.</li>
                  <li><strong>Vitesse d'Upload</strong> - Également mesurée en Mbps, montre la rapidité avec laquelle vous pouvez envoyer des données vers internet. Important pour les visioconférences, le streaming en direct et l'upload de fichiers.</li>
                  <li><strong>Ping/Latence</strong> - Mesurée en millisecondes (ms), représente le temps de réponse de votre connexion. Des valeurs inférieures à 60 ms sont excellentes pour les jeux en ligne et la visioconférence.</li>
                  <li><strong>Jitter</strong> - Mesure la variation du temps de réponse, indiquant la stabilité de la connexion. De faibles valeurs de jitter sont importantes pour la VoIP et le streaming vidéo.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Technologie de la Fibre Optique</h3>
                <p className="text-muted-foreground">
                  La fibre optique (FTTH - Fiber to the Home) est la technologie d'accès internet la plus avancée, offrant des vitesses symétriques élevées et une latence ultra-faible. En France, plus de 75% des foyers ont accès à la fibre optique, l'un des taux les plus élevés d'Europe. Au Canada, le déploiement de la fibre s'accélère, avec des objectifs gouvernementaux de connecter 98% des foyers d'ici 2030. La fibre optique utilise la lumière plutôt que l'électricité pour transmettre les données, permettant des vitesses pouvant atteindre plusieurs gigabits par seconde sans dégradation du signal sur de longues distances.
                </p>

                <h3 className="text-xl font-semibold mb-3">Conseils pour Améliorer Votre Vitesse Internet</h3>
                <p className="text-muted-foreground">
                  Si vos résultats de test de vitesse sont inférieurs aux attentes, essayez ces solutions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Redémarrez votre modem et routeur WiFi</li>
                  <li>Connectez-vous via câble Ethernet plutôt que WiFi pour des résultats plus stables</li>
                  <li>Fermez les applications et appareils non utilisés qui pourraient consommer de la bande passante</li>
                  <li>Positionnez votre routeur dans un endroit central et élevé</li>
                  <li>Mettez à jour le firmware de votre routeur vers la dernière version</li>
                  <li>Passez à un routeur WiFi 6 ou WiFi 6E pour de meilleures performances</li>
                  <li>Envisagez de passer à un forfait de vitesse supérieure si vos besoins ont augmenté</li>
                  <li>Contactez votre fournisseur si la vitesse est systématiquement inférieure à celle promise</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Internet 5G et Mobile</h3>
                <p className="text-muted-foreground">
                  Le Canada et la France ont tous deux déployé des réseaux 5G étendus. Au Canada, Bell, Rogers et TELUS offrent la 5G dans les grandes villes avec des vitesses pouvant atteindre 1 Gbps. En France, les quatre opérateurs principaux (Orange, Free, SFR, Bouygues) proposent la 5G avec une couverture croissante. La 5G offre une alternative viable à la fibre dans certains cas, particulièrement pour les zones rurales ou difficiles à câbler. Cependant, les forfaits de données peuvent être limités comparés à l'internet fixe illimité.
                </p>

                <h3 className="text-xl font-semibold mb-3">Réglementation et Qualité de Service</h3>
                <p className="text-muted-foreground">
                  Au Canada, le CRTC (Conseil de la radiodiffusion et des télécommunications canadiennes) réglemente les télécommunications et a établi des objectifs de vitesse minimale de 50 Mbps en téléchargement et 10 Mbps en upload pour tous les Canadiens. En France, l'ARCEP (Autorité de régulation des communications électroniques et des postes) supervise le secteur et exige que les fournisseurs respectent leurs engagements de vitesse. Si vous recevez constamment des vitesses inférieures à celles promises, vous avez le droit de déposer une plainte auprès de ces organismes régulateurs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Différences Régionales</h3>
                <p className="text-muted-foreground">
                  Les vitesses internet varient considérablement selon les régions. En France, Paris et les grandes métropoles bénéficient généralement des meilleures vitesses avec une couverture fibre quasi-totale. Au Canada, les zones urbaines comme Toronto, Montréal et Vancouver ont accès aux vitesses les plus élevées, tandis que les régions rurales peuvent encore dépendre de connexions DSL ou par satellite plus lentes. Le Québec a fait des progrès significatifs dans le déploiement de la fibre optique grâce à des initiatives gouvernementales, avec des objectifs d'accès universel à l'internet haute vitesse d'ici 2025-2026.
                </p>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Pour obtenir des résultats de test plus précis, nous recommandons d'exécuter le test plusieurs fois à différents moments de la journée, car la vitesse peut varier en fonction de la congestion du réseau. Utilisez une connexion Ethernet filaire dans la mesure du possible et fermez les autres applications qui pourraient utiliser internet pendant le test.
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
