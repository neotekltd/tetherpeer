export const languages = {
  'en': 'English',
  'fr': 'Français',
  'ar-TN': 'تونسي',
} as const;

export const currencies = {
  'TND': 'Tunisian Dinar',
  'USD': 'US Dollar',
} as const;

export type Language = keyof typeof languages;
export type Currency = keyof typeof currencies;

export const translations = {
  'fr': {
    common: {
      buy: 'Acheter',
      sell: 'Vendre',
      howItWorks: 'Comment ça marche',
      faq: 'FAQ',
      contact: 'Contact',
      search: 'Rechercher',
      amount: 'Montant',
      network: 'Réseau',
      paymentMethod: 'Méthode de paiement',
      allNetworks: 'Tous les réseaux',
      allMethods: 'Toutes les méthodes',
      available: 'Disponible',
      limits: 'Limites',
      trades: 'échanges',
      success: 'succès',
      verified: 'vérifié',
    },
    home: {
      hero: {
        title: 'Échangez USDT en Tunisie',
        subtitle: 'Plateforme P2P sécurisée pour acheter et vendre USDT',
      },
    },
    buy: {
      title: 'Acheter USDT en Tunisie',
      price: 'Prix',
    },
    sell: {
      title: 'Vendre USDT en Tunisie',
      price: 'Prix',
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Échange P2P USDT sécurisé en Tunisie',
      step1: {
        title: 'Créer un contrat',
        description: 'Choisissez une offre et commencez un échange. Notre plateforme crée automatiquement un contrat d\'entiercement sécurisé.',
      },
      step2: {
        title: 'Échange',
        description: 'Le vendeur dépose USDT dans le contrat. L\'acheteur envoie le paiement via Flouci ou D17.',
      },
      step3: {
        title: 'Libération',
        description: 'Après confirmation du paiement, USDT est libéré vers le portefeuille de l\'acheteur.',
      },
      cta: {
        title: 'Prêt à commencer?',
        subtitle: 'Rejoignez TetherPeer aujourd\'hui et découvrez l\'échange P2P USDT sécurisé en Tunisie.',
      },
    },
    faq: {
      title: 'Questions Fréquentes',
      subtitle: 'Tout ce que vous devez savoir sur l\'échange USDT sur TetherPeer',
      gettingStarted: {
        title: 'Pour Commencer',
        q1: 'Qu\'est-ce que TetherPeer?',
        a1: 'TetherPeer est une plateforme P2P non-custodiale spécialement conçue pour l\'échange d\'USDT en Tunisie. Nous facilitons les échanges sécurisés entre utilisateurs via des méthodes de paiement locales comme Flouci et D17.',
        q2: 'Comment commencer à échanger?',
        a2: 'Pour commencer, créez simplement un compte avec votre email. Pour les échanges de base (jusqu\'à 500 TND/jour), seule la vérification par email est requise. Pour des limites plus élevées (jusqu\'à 5 000 TND/jour), vous devrez vérifier votre numéro de téléphone.',
        q3: 'Quelles méthodes de paiement sont acceptées?',
        a3: 'Nous acceptons actuellement Flouci et D17, les méthodes de paiement les plus populaires en Tunisie. Nous prévoyons d\'ajouter d\'autres méthodes locales selon la demande.',
      },
      trading: {
        title: 'Échange',
        q1: 'Comment fonctionne le système d\'entiercement?',
        a1: 'Nous utilisons un système d\'entiercement multisig 2-sur-3. Quand un échange commence, le vendeur dépose l\'USDT dans un contrat intelligent. Les fonds ne peuvent être libérés que lorsque 2 des 3 parties (acheteur, vendeur ou plateforme) sont d\'accord.',
        q2: 'Quelles sont les limites d\'échange?',
        a2: 'Les utilisateurs non vérifiés peuvent échanger jusqu\'à 500 TND par jour. Les utilisateurs avec vérification téléphonique peuvent échanger jusqu\'à 5 000 TND par jour. Des limites plus élevées sont disponibles pour les utilisateurs avec vérification renforcée.',
        q3: 'Combien de temps prend un échange?',
        a3: 'La plupart des échanges sont complétés en 15-30 minutes. La durée réelle dépend de la méthode de paiement et de la réactivité des deux parties.',
      },
      security: {
        title: 'Sécurité',
        q1: 'TetherPeer est-il sûr?',
        a1: 'Oui, TetherPeer est conçu avec la sécurité comme priorité absolue. Nous utilisons des contrats d\'entiercement multisig non-custodiaux, ce qui signifie que nous ne détenons jamais vos fonds. Toutes les communications sont cryptées.',
        q2: 'Que se passe-t-il en cas de litige?',
        a2: 'En cas de litige, notre équipe de support intervient. Les deux parties peuvent soumettre des preuves (preuve de paiement, historique de chat, etc.). En dernier recours, notre clé de plateforme peut être utilisée pour résoudre le litige équitablement.',
        q3: 'Comment protégez-vous les données des utilisateurs?',
        a3: 'Nous cryptons toutes les données sensibles et suivons les meilleures pratiques de l\'industrie pour la sécurité des données. Nous ne collectons que les informations essentielles nécessaires aux échanges et à la vérification.',
      },
      technical: {
        title: 'Technique',
        q1: 'Quels réseaux USDT sont supportés?',
        a1: 'Nous supportons USDT sur trois réseaux : TRC20 (TRON), ERC20 (Ethereum) et Polygon. TRC20 est recommandé pour des frais plus bas.',
        q2: 'Quels sont les frais?',
        a2: 'TetherPeer prélève des frais de 0,5% par échange complété. Les frais de réseau (gas) varient selon le réseau choisi : TRC20 (le plus bas), Polygon (moyen), ERC20 (le plus élevé).',
        q3: 'Quels portefeuilles sont recommandés?',
        a3: 'Nous recommandons Trust Wallet ou MetaMask, car ils supportent tous nos réseaux disponibles. Assurez-vous d\'utiliser un portefeuille dont vous contrôlez les clés privées.',
      },
      cta: {
        title: 'Encore des questions?',
        subtitle: 'Notre équipe de support est là pour vous aider 24/7.',
      },
    },
  },
  'ar-TN': {
    common: {
      buy: 'شراء',
      sell: 'بيع',
      howItWorks: 'كيفاش يخدم',
      faq: 'أسئلة متداولة',
      contact: 'اتصل بينا',
      search: 'لوّج',
      amount: 'المبلغ',
      network: 'الشبكة',
      paymentMethod: 'طريقة الدفع',
      allNetworks: 'الكل الشبكات',
      allMethods: 'الكل الطرق',
      available: 'متوفر',
      limits: 'الحدود',
      trades: 'معاملات',
      success: 'نجاح',
      verified: 'موثّق',
    },
    home: {
      hero: {
        title: 'تبادل USDT في تونس',
        subtitle: 'منصة P2P آمنة للشراء والبيع USDT',
      },
    },
    buy: {
      title: 'شراء USDT في تونس',
      price: 'السعر',
    },
    sell: {
      title: 'بيع USDT في تونس',
      price: 'السعر',
    },
    howItWorks: {
      title: 'كيفاش يخدم',
      subtitle: 'تبادل P2P USDT آمن في تونس',
      step1: {
        title: 'إنشاء العقد',
        description: 'اختار عرض وابدأ التبادل. المنصة متاعنا تنشئ تلقائياً عقد ضمان آمن.',
      },
      step2: {
        title: 'التبادل',
        description: 'البائع يودع USDT في العقد. المشتري يرسل الفلوس عبر فلوسي ولا D17.',
      },
      step3: {
        title: 'التحرير',
        description: 'بعد تأكيد الدفع، يتم تحرير USDT إلى محفظة المشتري.',
      },
      cta: {
        title: 'جاهز للبدء؟',
        subtitle: 'انضم لـ TetherPeer اليوم وجرّب تبادل USDT الآمن في تونس.',
      },
    },
    faq: {
      title: 'الأسئلة المتداولة',
      subtitle: 'كل ما تحتاج تعرفو على تبادل USDT على TetherPeer',
      gettingStarted: {
        title: 'كيفاش تبدا',
        q1: 'شنوة هو TetherPeer؟',
        a1: 'TetherPeer هي منصة P2P غير وصائية مصممة خصيصاً لتبادل USDT في تونس. نسهلو المعاملات الآمنة بين المستخدمين عبر طرق الدفع المحلية كيما فلوسي و D17.',
        q2: 'كيفاش نبدا نتبادل؟',
        a2: 'باش تبدا، أعمل حساب بالإيمايل متاعك. للمعاملات الأساسية (حتى 500 دينار/يوم)، يلزم غير التحقق بالإيمايل. للحدود العالية (حتى 5000 دينار/يوم)، لازم تثبت رقم تليفونك.',
        q3: 'شنوما طرق الدفع المقبولة؟',
        a3: 'حالياً نقبلو فلوسي و D17، أشهر طرق الدفع في تونس. نخططو نزيدو طرق محلية أخرى حسب الطلب.',
      },
      trading: {
        title: 'التبادل',
        q1: 'كيفاش يخدم نظام الضمان؟',
        a1: 'نستعملو نظام ضمان متعدد الإمضاءات 2-من-3. كي يبدا التبادل، البائع يودع USDT في عقد ذكي. الفلوس ما تتحررش كان كي يوافقو 2 من 3 أطراف (المشتري، البائع، ولا المنصة).',
        q2: 'شنوما حدود التبادل؟',
        a2: 'المستخدمين الي ما عملوش التحقق ينجمو يتبادلو حتى 500 دينار في اليوم. المستخدمين الي ثبتو التليفون ينجمو يتبادلو حتى 5000 دينار في اليوم. في حدود أعلى للمستخدمين مع التحقق المعزز.',
        q3: 'قداش من وقت ياخو التبادل؟',
        a3: 'معظم المعاملات تكمل في 15-30 دقيقة. المدة الفعلية تعتمد على طريقة الدفع وسرعة رد الطرفين.',
      },
      security: {
        title: 'الأمان',
        q1: 'TetherPeer آمن للاستخدام؟',
        a1: 'إي، TetherPeer مصمم مع الأمان كأولوية قصوى. نستخدمو عقود ضمان متعددة الإمضاءات غير وصائية، معناها ما نمسكوش فلوسك. كل الاتصالات مشفرة.',
        q2: 'شنوة يصير في حالة نزاع؟',
        a2: 'في حالة نزاع، فريق الدعم متاعنا يتدخل. الطرفين ينجمو يقدمو أدلة (إثبات الدفع، سجل المحادثة، الخ). كحل أخير، نستعملو مفتاح المنصة لحل النزاع بعدل.',
        q3: 'كيفاش تحميو بيانات المستخدمين؟',
        a3: 'نشفرو كل البيانات الحساسة ونتبعو أفضل ممارسات الصناعة في أمن البيانات. نجمعو غير المعلومات الضرورية للتبادل والتحقق.',
      },
      technical: {
        title: 'التقني',
        q1: 'شنوما شبكات USDT المدعومة؟',
        a1: 'ندعمو USDT على ثلاث شبكات: TRC20 (TRON)، ERC20 (Ethereum) و Polygon. ننصحو باستخدام TRC20 للمصاريف الأقل.',
        q2: 'شنوما المصاريف؟',
        a2: 'TetherPeer ياخو 0.5% على كل معاملة مكتملة. مصاريف الشبكة (gas) تختلف حسب الشبكة المختارة: TRC20 (الأقل)، Polygon (متوسط)، ERC20 (الأعلى).',
        q3: 'شنوما المحافظ الموصى بيها؟',
        a3: 'ننصحو باستخدام Trust Wallet ولا MetaMask، خاطرهم يدعمو كل الشبكات المتوفرة عندنا. تأكد باش تستعمل محفظة تتحكم في المفاتيح الخاصة متاعها.',
      },
      cta: {
        title: 'عندك أسئلة أخرى؟',
        subtitle: 'فريق الدعم متاعنا موجود للمساعدة 24/7.',
      },
    },
  },
}; 