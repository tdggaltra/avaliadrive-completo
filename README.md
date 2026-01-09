# AvaliaDrive - Landing Page

Landing page moderna e responsiva para validação de negócio do AvaliaDrive.

## 📋 Sobre o Projeto

Sistema de avaliação para autoescolas que digitaliza e padroniza as avaliações de alunos nas aulas práticas.

## 🎨 Características

- ✅ Design moderno e profissional
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Animações suaves e interativas
- ✅ Formulário de pesquisa completo
- ✅ Seção de FAQ com accordion
- ✅ Área de preços indicativos
- ✅ Modal de sucesso
- ✅ Integração pronta para Google Analytics
- ✅ Otimizado para SEO

## 🚀 Como Usar

### Abrir Localmente

1. Baixe todos os arquivos (index.html, styles.css, script.js)
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! A landing page está funcionando

### Hospedagem

Você pode hospedar gratuitamente em:

- **GitHub Pages**: Faça upload dos arquivos em um repositório
- **Netlify**: Arraste a pasta no site do Netlify
- **Vercel**: Conecte seu repositório GitHub
- **Firebase Hosting**: Configure com Firebase CLI

## 🔧 Personalização

### Alterar Cores

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #00D9A3;  /* Cor principal */
    --primary-dark: #00B386;   /* Cor escura */
    --primary-light: #33E3B8;  /* Cor clara */
}
```

### Alterar Informações de Contato

No arquivo `index.html`, procure pela seção `contact-section` e altere:

```html
<a href="mailto:SEU_EMAIL@exemplo.com">SEU_EMAIL@exemplo.com</a>
<a href="https://wa.me/5543999999999">(43) 99999-9999</a>
```

### Configurar Envio de Formulários

Atualmente os formulários apenas mostram os dados no console. Para integrar com backend:

1. **Opção 1 - Google Forms (Mais Simples)**
   - Crie um Google Form
   - Use um serviço como FormSubmit.co ou Google Apps Script
   - Substitua o código de submit no `script.js`

2. **Opção 2 - EmailJS (Recomendado para MVP)**
   ```javascript
   // Adicione no <head> do HTML:
   <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
   
   // Configure no script.js:
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data);
   ```

3. **Opção 3 - Backend Próprio**
   - Configure uma API (Node.js, Python, PHP, etc.)
   - Substitua a linha de `fetch` no script.js:
   ```javascript
   const response = await fetch('https://sua-api.com/pesquisa', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
   });
   ```

### Google Analytics

Para adicionar tracking:

1. Crie uma conta no Google Analytics
2. Adicione antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 Seções da Landing Page

1. **Hero Section**: Apresentação principal com CTA
2. **Problema**: 6 principais dores das autoescolas
3. **Solução**: Como o AvaliaDrive resolve
4. **Funcionalidades**: 8 recursos principais
5. **Benefícios**: 3 principais vantagens
6. **Pesquisa**: Formulário de inscrição para validação
7. **Preços**: Valores indicativos dos planos
8. **FAQ**: Perguntas frequentes
9. **Contato**: Formulário rápido e informações

## 🎯 Próximos Passos Sugeridos

1. **Curto Prazo (Esta Semana)**
   - [ ] Configurar envio de e-mails do formulário
   - [ ] Adicionar Google Analytics
   - [ ] Hospedar a landing page
   - [ ] Testar em diferentes dispositivos

2. **Médio Prazo (Próximas Semanas)**
   - [ ] Adicionar depoimentos (quando tiver)
   - [ ] Criar vídeo demo do produto
   - [ ] Implementar chat ao vivo (ex: Tawk.to)
   - [ ] Adicionar calculadora de ROI

3. **Longo Prazo (Após Validação)**
   - [ ] Integrar com CRM
   - [ ] Adicionar blog para SEO
   - [ ] Criar área de demonstração
   - [ ] Implementar testes A/B

## 📊 Métricas Importantes para Acompanhar

- Taxa de conversão do formulário
- Tempo médio na página
- Taxa de rejeição
- Origem do tráfego
- Cliques nos CTAs
- Páginas mais visitadas

## 🔌 Integrações Recomendadas

- **EmailJS ou SendGrid**: Envio de e-mails
- **Google Analytics**: Análise de tráfego
- **Hotjar**: Mapas de calor e gravações
- **Mailchimp**: Newsletter
- **Calendly**: Agendamento de entrevistas
- **WhatsApp Business API**: Chat direto

## 💡 Dicas para a Pesquisa de Validação

1. Compartilhe a landing page nas redes sociais
2. Entre em grupos de autoescolas no Facebook
3. Envie por WhatsApp para contatos do setor
4. Faça anúncios segmentados no Google Ads
5. Visite autoescolas presencialmente e mostre no tablet

## 📞 Suporte

Para dúvidas sobre a landing page, consulte os comentários no código-fonte.

## 📄 Licença

Este projeto foi desenvolvido especificamente para o AvaliaDrive.

---

**Desenvolvido para o projeto AvaliaDrive** 🚗
Transformando a avaliação de alunos em autoescolas!

