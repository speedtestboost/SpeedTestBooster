// Language selector component with geolocation detection and SEO optimization
import React from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSupportedLanguages, getLanguageRoute } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange?: (lang: string) => void;
  showLabel?: boolean;
  variant?: 'header' | 'footer' | 'standalone';
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  showLabel = true,
  variant = 'header'
}: LanguageSelectorProps) {
  const supportedLanguages = getSupportedLanguages();
  const currentLangInfo = supportedLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageSelect = (langCode: string) => {
    // Track language selection
    trackEvent('language_selected', 'i18n', langCode, 1);
    
    // If we have a callback, use it (for same-page language switching)
    if (onLanguageChange) {
      onLanguageChange(langCode);
      return;
    }
    
    // Otherwise, navigate to the appropriate route
    const route = getLanguageRoute(langCode);
    window.location.href = route;
  };

  // Render different styles based on variant
  const renderTrigger = () => {
    switch (variant) {
      case 'header':
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Globe className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              {currentLangInfo?.flag} {showLabel && currentLangInfo?.name}
            </span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        );
      
      case 'footer':
        return (
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            <Globe className="h-3 w-3 mr-2" />
            <span>{currentLangInfo?.flag} {currentLangInfo?.name}</span>
            <ChevronDown className="h-3 w-3 ml-2" />
          </Button>
        );
      
      case 'standalone':
      default:
        return (
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-4 gap-2"
          >
            <Globe className="h-4 w-4" />
            <span className="flex items-center gap-2">
              {currentLangInfo?.flag}
              {showLabel && <span>{currentLangInfo?.name}</span>}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-1"
        sideOffset={5}
      >
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-b border-border/50 mb-1">
          Choose Language
        </div>
        
        {supportedLanguages.map((lang) => {
          const isSelected = lang.code === currentLanguage;
          const route = getLanguageRoute(lang.code);
          
          return (
            <DropdownMenuItem
              key={lang.code}
              className="flex items-center justify-between py-2 px-3 cursor-pointer focus:bg-primary/10 focus:text-primary"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground">{route}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isSelected && (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      Current
                    </Badge>
                  </>
                )}
                
                {/* Auto-detect badge for first time users */}
                {lang.code === currentLanguage && !localStorage.getItem('speedtest-language-manual') && (
                  <Badge variant="outline" className="text-xs px-2 py-0 border-primary/50 text-primary">
                    Auto
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
        
        <div className="px-2 py-1.5 mt-1 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <Globe className="h-3 w-3 inline mr-1" />
            Language auto-detected from your location
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
