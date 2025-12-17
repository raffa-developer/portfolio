# Guia de Teste de Performance

## 🎯 Testes Rápidos de Performance

### 1. Firefox Profiler (Recomendado para análise detalhada)

#### Passos:
1. Abra seu site em produção no Firefox
2. Pressione `Ctrl+Shift+5` (ou Menu → Mais ferramentas → Performance)
3. Clique em "Capture Profile"
4. Interaja com o site por 15-30 segundos:
   - Mova o mouse pela página
   - Role a página
   - Clique em elementos
   - Navegue entre seções
5. Clique em "Stop Capture"
6. Analise os resultados:
   - **Call Tree**: Veja quais funções estão usando mais CPU
   - **Flame Graph**: Visualize onde está o tempo sendo gasto
   - **Marker Chart**: Veja eventos específicos

#### Métricas para verificar:
- ✅ **CPU Usage**: Deve estar entre 20-40% (antes era 75-90%)
- ✅ **Paint Operations**: Deve ser < 10% (antes era 27%)
- ✅ **FPS**: Deve estar acima de 30fps (antes estava em 10fps)
- ✅ **RefreshDriver tick**: Principal operação de renderização

### 2. Chrome DevTools Performance

#### Passos:
1. Abra seu site em produção no Chrome
2. Pressione `F12` para abrir DevTools
3. Vá para a aba **Performance**
4. Clique no botão de gravação (círculo)
5. Interaja com o site por 15-30 segundos
6. Pare a gravação
7. Analise:
   - **FPS**: Deve estar verde (60fps) ou amarelo (30-59fps)
   - **CPU**: Verifique o uso da CPU na timeline
   - **Rendering**: Veja quantas vezes "Paint" acontece

#### Métricas importantes:
- ✅ **FPS**: Verde (60fps) ou amarelo (>30fps)
- ✅ **CPU**: Não deve estar constantemente no topo
- ✅ **Paint**: Deve ter poucos eventos de pintura

### 3. Chrome DevTools Lighthouse

#### Passos:
1. Abra seu site em produção no Chrome
2. Pressione `F12` para abrir DevTools
3. Vá para a aba **Lighthouse**
4. Selecione categorias (Performance, Best Practices)
5. Selecione dispositivo (Mobile/Desktop)
6. Clique em "Analyze page load"

#### Pontuações esperadas:
- ✅ **Performance**: > 90 (excelente)
- ✅ **Best Practices**: > 90
- ✅ **SEO**: > 90

### 4. PageSpeed Insights (Online)

#### Passos:
1. Acesse: https://pagespeed.web.dev/
2. Digite a URL do seu site
3. Clique em "Analyze"
4. Revise as métricas Core Web Vitals:
   - **LCP** (Largest Contentful Paint): < 2.5s
   - **FID** (First Input Delay): < 100ms
   - **CLS** (Cumulative Layout Shift): < 0.1

### 5. WebPageTest (Análise Detalhada)

#### Passos:
1. Acesse: https://www.webpagetest.org/
2. Digite a URL do seu site
3. Selecione localização e navegador
4. Clique em "Start Test"
5. Analise:
   - Tempo de carregamento
   - Screenshots da renderização
   - Waterfall chart
   - Filmstrip view

## 📊 Comparação: Antes vs Depois

### Antes das Otimizações:
- ❌ CPU: 75-90%
- ❌ Paint: 27%
- ❌ FPS: ~10fps
- ❌ RefreshDriver tick: 80%

### Depois das Otimizações (Esperado):
- ✅ CPU: 30-50%
- ✅ Paint: 5-10%
- ✅ FPS: 30-60fps
- ✅ RefreshDriver tick: Reduzido significativamente

## 🔍 O que procurar especificamente:

### MouseGlow Component:
- Verifique se está usando ~30fps ao invés de 60fps
- Verifique se Paint operations estão reduzidas
- Verifique uso de GPU (deve aparecer como compositor layer)

### Animações CSS:
- Verifique se estão usando GPU acceleration (translate3d)
- Verifique se will-change está sendo aplicado corretamente

### React Re-renders:
- Use React DevTools Profiler para ver quantas vezes componentes re-renderizam
- ProjectCard deve renderizar apenas quando necessário (memoização)

## ⚠️ Dicas Importantes:

1. **Teste em modo anônimo**: Para evitar extensões interferindo
2. **Desabilite cache**: Para ver carregamento inicial
3. **Teste em diferentes dispositivos**: Desktop e mobile
4. **Teste com diferentes conexões**: 3G, 4G, WiFi
5. **Compare antes e depois**: Tire screenshots dos resultados

## 🎯 Checklist de Verificação:

- [ ] Firefox Profiler mostra CPU < 50%
- [ ] Paint operations < 10%
- [ ] FPS está acima de 30fps
- [ ] Chrome DevTools Performance mostra FPS verde/amarelo
- [ ] Lighthouse Performance score > 90
- [ ] PageSpeed Insights Core Web Vitals estão verdes
- [ ] MouseGlow funciona mas não sobrecarrega CPU
- [ ] Animações são suaves
- [ ] Sem jank (travamentos) ao rolar a página


