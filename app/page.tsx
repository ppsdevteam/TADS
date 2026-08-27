"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import {
  geoBounds,
  geoCentroid,
  geoContains,
  geoMercator,
  geoPath,
} from "d3-geo";
import type { Feature, FeatureCollection, Polygon, Position } from "geojson";
import jordanAdm1 from "./data/jordan-adm1.json";

type Language = "en" | "ar";
type IconName =
  | "arrow"
  | "building"
  | "check"
  | "chat"
  | "close"
  | "globe"
  | "mail"
  | "menu"
  | "network"
  | "phone"
  | "pin"
  | "shield"
  | "spark"
  | "truck";

const content = {
  en: {
    languageName: "العربية",
    languageCode: "AR",
    menuLabel: "Open navigation",
    closeLabel: "Close navigation",
    nav: [
      { label: "About", href: "#about" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Our Agencies", href: "#agencies" },
      { label: "Partners", href: "#partners" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Market access · Healthcare distribution",
      titleLines: ["Building brands.", "Expanding healthcare access."],
      body: "A trusted market access and healthcare distribution partner connecting quality brands with providers across Jordan.",
      primary: "Partner with us",
      secondary: "Discover our capabilities",
      trust: "Established 2019",
      location: "Amman, Jordan",
      imageAlt:
        "Real exterior view of the Taaluf Alkhair Drug Store headquarters in Amman",
    },
    metrics: [
      { value: "4,000+", label: "Pharmacies & medical centers reached" },
      { value: "1,800+", label: "Active customers" },
      { value: "70+", label: "Local partner companies" },
      { value: "53", label: "Team professionals" },
    ],
    reach: {
      eyebrow: "Nationwide reach",
      title: "A nationwide network, visible at a glance.",
      body: "Our distribution network reaches pharmacies and medical centers throughout Jordan’s populated cities and communities, with the broadest concentration in Amman followed by Irbid, Aqaba, Salt, and Madaba.",
      mapAria:
        "Interactive map of Jordan showing TADS pharmacy and medical-center coverage points across populated areas of the Kingdom.",
      mapDescription:
        "The number and placement of dots illustrate the current relative distribution footprint. Exact one-to-one pharmacy locations can be added when verified governorate-level data is available.",
    },
    about: {
      eyebrow: "About TADS",
      title: "More than a distributor. A market access partner.",
      body: "Established in 2019, Taaluf Alkhair Drug Store is a fast-growing pharmaceutical and healthcare distribution company based in Amman. We help manufacturers enter, grow, and build sustainable brands in Jordan through integrated commercial and operational support.",
      quote: "We build brands, not just distribution channels.",
      cards: [
        {
          title: "Our mission",
          text: "Deliver high-quality healthcare and personal care solutions that improve well-being.",
        },
        {
          title: "Our vision",
          text: "To be a trusted leader in healthcare distribution and a preferred partner for global brands in Jordan and the Middle East.",
        },
      ],
      imageAlt:
        "Real view of TADS healthcare stock and daily operations in Amman",
    },
    portfolio: {
      eyebrow: "Healthcare portfolio",
      title: "Focused categories. Broad market reach.",
      body: "Our diversified portfolio supports pharmacies, medical centers, and healthcare providers with carefully selected categories.",
      categories: [
        {
          number: "01",
          title: "Pharmaceuticals",
          text: "Reliable market access and nationwide distribution support.",
        },
        {
          number: "02",
          title: "Food supplements",
          text: "Wellness and nutrition categories for evolving consumer needs.",
        },
        {
          number: "03",
          title: "Medical devices",
          text: "Practical healthcare solutions for professional and home use.",
        },
        {
          number: "04",
          title: "Dermocosmetics & personal care",
          text: "Specialized beauty, skin health, and personal care categories.",
        },
        {
          number: "05",
          title: "Baby nutrition",
          text: "Selected infant and family nutrition categories.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Our capabilities",
      title: "End-to-end support for every side of healthcare.",
      body: "From regulatory preparation to the final delivery, our teams combine local market knowledge with dependable execution.",
      supplierTitle: "For manufacturers & suppliers",
      supplierText:
        "A practical route to launch, scale, and strengthen healthcare brands in Jordan.",
      supplierItems: [
        "Regulatory registration support",
        "Importation & compliance",
        "Pricing & market strategy",
        "Market penetration planning",
        "Brand development & marketing",
        "Dedicated sales execution",
      ],
      providerTitle: "For healthcare providers",
      providerText:
        "A responsive distribution partner built around continuity, selection, and service.",
      providerItems: [
        "On-time delivery",
        "Diverse healthcare portfolio",
        "Innovative category solutions",
        "Responsive market support",
      ],
      qualityTag: "Quality · Compliance · Reliability",
      imageAlt:
        "Real view of the organized TADS healthcare distribution warehouse",
    },
    agencies: {
      eyebrow: "Our international agencies",
      title: "International brands. Officially represented in Jordan.",
      body: "TADS is the authorized agent and distributor in Jordan for three international healthcare and personal-care brands, supporting market access, nationwide distribution, and long-term brand development.",
      representationLabel: "Authorized agent & distributor in Jordan",
      websiteLabel: "Visit official website",
      items: [
        {
          name: "IM Healthcare",
          category: "Contract gummy manufacturing",
          description:
            "An India-based specialist in contract manufacturing and private-label gummy supplements, offering custom formulations and packaging from concept to finished product.",
        },
        {
          name: "Youlicious",
          category: "Skin, hair & personal care",
          description:
            "An innovative beauty brand where beauty meets science, with ranges across skincare, haircare, personal care, sunscreen, and supplements.",
        },
        {
          name: "Drakon",
          category: "Skincare & personal care",
          description:
            "A specialized care brand with collections spanning facial care, sun care, deodorants, intimate care, and detox solutions.",
        },
      ],
    },
    partners: {
      eyebrow: "Distribution network",
      title: "Our trusted partners",
      ariaLabel: "Partner logos",
    },
    values: {
      eyebrow: "What guides us",
      title: "Built on trust, delivered with discipline.",
      items: [
        {
          title: "Ethics & integrity",
          text: "We act transparently and responsibly in every relationship.",
        },
        {
          title: "Competence",
          text: "We invest in capable people and informed decisions.",
        },
        {
          title: "Quality & compliance",
          text: "We uphold rigorous standards across every operation.",
        },
        {
          title: "Reliability",
          text: "We do what we promise, consistently and on time.",
        },
        {
          title: "Sustainability",
          text: "We build partnerships and growth designed to last.",
        },
        {
          title: "Respect",
          text: "We value our people, partners, providers, and communities.",
        },
      ],
    },
    contact: {
      eyebrow: "Start a conversation",
      title: "Ready to grow your healthcare brand in Jordan?",
      body: "Talk to our team about market entry, distribution, brand development, or becoming part of our healthcare network.",
      emailCta: "Email our team",
      callCta: "Call us",
      addressLabel: "Head office",
      address: "Al Sahel St., Amman, Jordan",
      directions: "Get directions",
      phoneLabel: "Phone",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
    },
    footer: {
      legalName: "Taaluf Alkhair Drug Store (TADS)",
      description:
        "Market access and healthcare distribution, built for lasting brand growth.",
      rights: "Taaluf Alkhair Drug Store. All rights reserved.",
      backToTop: "Back to top",
    },
  },
  ar: {
    languageName: "English",
    languageCode: "EN",
    menuLabel: "فتح قائمة التنقل",
    closeLabel: "إغلاق قائمة التنقل",
    nav: [
      { label: "من نحن", href: "#about" },
      { label: "قدراتنا", href: "#capabilities" },
      { label: "مجالاتنا", href: "#portfolio" },
      { label: "وكالاتنا", href: "#agencies" },
      { label: "شركاؤنا", href: "#partners" },
      { label: "تواصل معنا", href: "#contact" },
    ],
    hero: {
      eyebrow: "دخول الأسواق · توزيع الرعاية الصحية",
      titleLines: [
        "نبني العلامات التجارية.",
        "ونوسّع الوصول إلى",
        "الرعاية الصحية.",
      ],
      body: "شريك موثوق لدخول الأسواق وتوزيع حلول الرعاية الصحية، نربط العلامات المتميزة بمقدمي الرعاية في مختلف أنحاء الأردن.",
      primary: "ابدأ شراكتك معنا",
      secondary: "اكتشف قدراتنا",
      trust: "تأسست عام 2019",
      location: "عمّان، الأردن",
      imageAlt:
        "صورة حقيقية لواجهة مقر مستودع أدوية تآلف الخير في عمّان",
    },
    metrics: [
      { value: "+4,000", label: "صيدلية ومركز طبي ضمن شبكة الوصول" },
      { value: "+1,800", label: "عميل فعّال" },
      { value: "+70", label: "شركة محلية شريكة" },
      { value: "53", label: "متخصصًا ضمن الفريق" },
    ],
    reach: {
      eyebrow: "انتشار وطني",
      title: "شبكة وطنية يظهر انتشارها بلمحة واحدة.",
      body: "تصل شبكة توزيعنا إلى الصيدليات والمراكز الطبية في المدن والمناطق المأهولة بمختلف أنحاء الأردن، ويتركز الانتشار الأكبر في عمّان ثم إربد والعقبة والسلط ومادبا.",
      mapAria:
        "خريطة تفاعلية للأردن تعرض نقاط وصول شبكة TADS إلى الصيدليات والمراكز الطبية في المناطق المأهولة بمختلف أنحاء المملكة.",
      mapDescription:
        "يمثل عدد النقاط وتوزيعها بصريًا الانتشار النسبي الحالي. يمكن ربط كل نقطة بموقع صيدلية فعلي عند توفر بيانات موثقة لكل محافظة.",
    },
    about: {
      eyebrow: "عن الشركة",
      title: "أكثر من موزّع. شريكك لدخول السوق.",
      body: "تأسس مستودع أدوية تآلف الخير عام 2019، وهو شركة سريعة النمو في توزيع الأدوية ومنتجات الرعاية الصحية ومقرها عمّان. نساعد المصنّعين على دخول السوق الأردني والنمو فيه وبناء علامات مستدامة من خلال دعم تجاري وتشغيلي متكامل.",
      quote: "نبني العلامات التجارية، لا مجرد قنوات توزيع.",
      cards: [
        {
          title: "رسالتنا",
          text: "تقديم حلول عالية الجودة للرعاية الصحية والعناية الشخصية تسهم في تحسين الرفاه وجودة الحياة.",
        },
        {
          title: "رؤيتنا",
          text: "أن نكون رائدًا موثوقًا في توزيع منتجات الرعاية الصحية، والشريك المفضّل للعلامات العالمية في الأردن والشرق الأوسط.",
        },
      ],
      imageAlt:
        "صورة حقيقية لمخزون الرعاية الصحية وعمليات العمل اليومية لدى TADS في عمّان",
    },
    portfolio: {
      eyebrow: "مجالات الرعاية الصحية",
      title: "مجالات متخصصة ووصول واسع إلى السوق",
      body: "تدعم قائمتنا المتنوعة الصيدليات والمراكز الطبية ومقدمي الرعاية ضمن فئات مختارة بعناية.",
      categories: [
        {
          number: "01",
          title: "الأدوية",
          text: "دعم موثوق لدخول السوق والتوزيع على مستوى المملكة.",
        },
        {
          number: "02",
          title: "المكملات الغذائية",
          text: "فئات للصحة والتغذية تلبي احتياجات المستهلك المتغيرة.",
        },
        {
          number: "03",
          title: "الأجهزة الطبية",
          text: "حلول عملية للرعاية الصحية للاستخدام المهني والمنزلي.",
        },
        {
          number: "04",
          title: "العناية بالبشرة والعناية الشخصية",
          text: "فئات متخصصة للجمال وصحة البشرة والعناية اليومية.",
        },
        {
          number: "05",
          title: "تغذية الأطفال",
          text: "فئات مختارة لتغذية الأطفال والعائلة.",
        },
      ],
    },
    capabilities: {
      eyebrow: "قدراتنا",
      title: "دعم متكامل لكل أطراف قطاع الرعاية الصحية.",
      body: "من التحضير التنظيمي وحتى التسليم النهائي، يجمع فريقنا بين معرفة السوق المحلية والتنفيذ الموثوق.",
      supplierTitle: "للمصنّعين والمورّدين",
      supplierText:
        "مسار عملي لإطلاق علامات الرعاية الصحية وتوسيعها وتعزيز حضورها في الأردن.",
      supplierItems: [
        "دعم التسجيل التنظيمي",
        "الاستيراد والامتثال",
        "استراتيجية التسعير والسوق",
        "التخطيط لدخول السوق",
        "تطوير العلامة والتسويق",
        "تنفيذ مبيعات متخصص",
      ],
      providerTitle: "لمقدمي الرعاية الصحية",
      providerText:
        "شريك توزيع سريع الاستجابة يرتكز على الاستمرارية والتنوع وجودة الخدمة.",
      providerItems: [
        "التسليم في الوقت المحدد",
        "قائمة رعاية صحية متنوعة",
        "حلول مبتكرة ضمن الفئات",
        "دعم سريع للسوق",
      ],
      qualityTag: "الجودة · الامتثال · الموثوقية",
      imageAlt:
        "صورة حقيقية لمستودع TADS المنظم لتوزيع منتجات الرعاية الصحية",
    },
    agencies: {
      eyebrow: "وكالاتنا الدولية",
      title: "علامات عالمية نمثّلها رسميًا في السوق الأردني.",
      body: "TADS هي الوكيل والموزّع المعتمد في الأردن لثلاث علامات دولية في الرعاية الصحية والعناية الشخصية، وتدعم دخولها إلى السوق وتوزيعها على مستوى المملكة ونموها المستدام.",
      representationLabel: "الوكيل والموزّع المعتمد في الأردن",
      websiteLabel: "زيارة الموقع الرسمي",
      items: [
        {
          name: "IM Healthcare",
          category: "تصنيع مكملات الجيلي للغير",
          description:
            "شركة هندية متخصصة في تصنيع مكملات الجيلي للغير والعلامات الخاصة، مع تطوير تركيبات مخصصة وخيارات تغليف تبدأ من الفكرة وتنتهي بالمنتج الجاهز.",
        },
        {
          name: "Youlicious",
          category: "العناية بالبشرة والشعر والعناية الشخصية",
          description:
            "علامة مبتكرة تلتقي فيها العناية بالجمال مع العلم، وتضم مجموعات للبشرة والشعر والعناية الشخصية والوقاية من الشمس والمكملات.",
        },
        {
          name: "Drakon",
          category: "العناية بالبشرة والعناية الشخصية",
          description:
            "علامة متخصصة في العناية بالبشرة والعناية الشخصية، وتشمل مجموعاتها العناية بالوجه والوقاية من الشمس ومزيلات العرق والعناية الحميمة ومنتجات الديتوكس.",
        },
      ],
    },
    partners: {
      eyebrow: "شبكة التوزيع",
      title: "شركاؤنا الموثوقون",
      ariaLabel: "شعارات الشركاء",
    },
    values: {
      eyebrow: "ما الذي يوجّهنا",
      title: "نبني على الثقة، وننجز بانضباط.",
      items: [
        {
          title: "الأخلاق والنزاهة",
          text: "نتعامل بشفافية ومسؤولية في كل علاقة.",
        },
        {
          title: "الكفاءة",
          text: "نستثمر في الأشخاص المؤهلين والقرارات المدروسة.",
        },
        {
          title: "الجودة والامتثال",
          text: "نلتزم بمعايير دقيقة في جميع عملياتنا.",
        },
        {
          title: "الموثوقية",
          text: "نفي بما نعد به، باستمرار وفي الوقت المحدد.",
        },
        {
          title: "الاستدامة",
          text: "نبني شراكات ونموًا قادرين على الاستمرار.",
        },
        {
          title: "الاحترام",
          text: "نقدّر فريقنا وشركاءنا ومقدمي الرعاية ومجتمعنا.",
        },
      ],
    },
    contact: {
      eyebrow: "ابدأ الحديث معنا",
      title: "هل أنت مستعد لتنمية علامتك في قطاع الرعاية الصحية بالأردن؟",
      body: "تحدث مع فريقنا حول دخول السوق أو التوزيع أو تطوير العلامة أو الانضمام إلى شبكة الرعاية الصحية لدينا.",
      emailCta: "راسل فريقنا",
      callCta: "اتصل بنا",
      addressLabel: "المكتب الرئيسي",
      address: "شارع الساحل، عمّان، الأردن",
      directions: "الاتجاهات على الخريطة",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      whatsappLabel: "واتساب",
    },
    footer: {
      legalName: "مستودع أدوية تآلف الخير (TADS)",
      description:
        "دخول الأسواق وتوزيع الرعاية الصحية لبناء نمو مستدام للعلامات.",
      rights: "مستودع أدوية تآلف الخير. جميع الحقوق محفوظة.",
      backToTop: "العودة إلى الأعلى",
    },
  },
} as const;

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m14 7 5 5-5 5" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
          <path d="M9 21v-3h6v3" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m6 12 4 4 8-8" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.8-4.8A8.5 8.5 0 1 1 21 11.5Z" />
          <path d="M8.5 9.5c.8 2.1 2 3.3 4 4" />
          <path d="M8.1 8.2h.01M13.8 14h.01" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="m11 7-5 9M13 7l5 9M7 18h10" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.9Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3-1.4 4.1A5.5 5.5 0 0 1 7.1 10L3 12l4.1 1.4a5.5 5.5 0 0 1 3.5 3.5L12 21l1.4-4.1a5.5 5.5 0 0 1 3.5-3.5L21 12l-4.1-2a5.5 5.5 0 0 1-3.5-2.9L12 3Z" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
  }
}

const companySchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taaluf Alkhair Drug Store",
  alternateName: "TA Drug Store (TADS)",
  foundingDate: "2019",
  description:
    "Healthcare market access and distribution company based in Amman, Jordan.",
  email: "tads.jo@outlook.com",
  telephone: "+962795672207",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Sahel St.",
    addressLocality: "Amman",
    addressCountry: "JO",
  },
};

const agencyProfiles = [
  {
    src: "/assets/imh-logo.png",
    alt: "IM Healthcare",
    website: "https://imhealthcare.in/",
  },
  {
    src: "/assets/youlicious-logo.png",
    alt: "Youlicious",
    website: "https://youlicious4me.com/",
  },
  {
    src: "/assets/drakon-logo.png",
    alt: "Drakon",
    website: "https://edrakon.com/",
  },
] as const;

const partnerLogos = [
  { src: "/assets/partner-tq.png", alt: "TQ" },
  {
    src: "/assets/partner-pharma-international.png",
    alt: "Pharma International",
  },
  { src: "/assets/partner-vmark.png", alt: "Partner" },
  { src: "/assets/partner-ms-pharma.png", alt: "MS Pharma" },
  { src: "/assets/partner-ms-group.png", alt: "MS Group" },
  { src: "/assets/partner-hikma.png", alt: "Hikma" },
  { src: "/assets/partner-dar-al-dawa.png", alt: "Dar Al Dawa" },
  { src: "/assets/partner-bt-pharma.png", alt: "BT Pharma" },
  { src: "/assets/partner-bio-energy-tech.png", alt: "Bio Energy Tech" },
] as const;

type GovernorateProperties = {
  shapeName: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
};

type GovernorateFeature = Feature<Polygon, GovernorateProperties>;
type CoverageConfig = {
  count: number;
  seed: number;
  anchor: Position;
  spread: [number, number];
};

const sourceJordanGeo = jordanAdm1 as FeatureCollection<
  Polygon,
  GovernorateProperties
>;

// d3-geo uses spherical winding opposite to RFC 7946, so the published
// geoBoundaries rings are reversed once before projection.
const jordanGovernorates: FeatureCollection<
  Polygon,
  GovernorateProperties
> = {
  type: "FeatureCollection",
  features: sourceJordanGeo.features.map((feature) => ({
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: feature.geometry.coordinates.map((ring) =>
        [...ring].reverse(),
      ),
    },
  })),
};

// The dot counts preserve the client-provided relative order of reach.
// They are a visual distribution model until verified location-level data is supplied.
const coverageConfig: Record<string, CoverageConfig> = {
  Amman: {
    count: 50,
    seed: 11,
    anchor: [35.945, 31.955],
    spread: [0.31, 0.22],
  },
  Irbid: {
    count: 34,
    seed: 23,
    anchor: [35.85, 32.556],
    spread: [0.25, 0.18],
  },
  Aqaba: {
    count: 24,
    seed: 37,
    anchor: [35.0072, 29.5236],
    spread: [0.18, 0.2],
  },
  Balqa: {
    count: 20,
    seed: 47,
    anchor: [35.7272, 32.0392],
    spread: [0.18, 0.13],
  },
  Madaba: {
    count: 17,
    seed: 67,
    anchor: [35.793, 31.718],
    spread: [0.15, 0.12],
  },
  Zarqa: {
    count: 14,
    seed: 41,
    anchor: [36.102, 32.072],
    spread: [0.18, 0.13],
  },
  Jerash: {
    count: 10,
    seed: 59,
    anchor: [35.899, 32.281],
    spread: [0.1, 0.08],
  },
  Ajloun: {
    count: 9,
    seed: 61,
    anchor: [35.752, 32.333],
    spread: [0.09, 0.07],
  },
  Karak: {
    count: 9,
    seed: 71,
    anchor: [35.704, 31.185],
    spread: [0.16, 0.13],
  },
  Mafraq: {
    count: 8,
    seed: 53,
    anchor: [36.208, 32.342],
    spread: [0.16, 0.12],
  },
  Tafilah: {
    count: 7,
    seed: 73,
    anchor: [35.604, 30.837],
    spread: [0.14, 0.1],
  },
  "Ma'an": {
    count: 7,
    seed: 79,
    anchor: [35.734, 30.195],
    spread: [0.18, 0.13],
  },
};

const governorateNames = {
  en: {
    Amman: "Amman",
    Irbid: "Irbid",
    Aqaba: "Aqaba",
    Zarqa: "Zarqa",
    Balqa: "Balqa",
    Mafraq: "Mafraq",
    Jerash: "Jerash",
    Ajloun: "Ajloun",
    Madaba: "Madaba",
    Karak: "Karak",
    Tafilah: "Tafilah",
    "Ma'an": "Ma’an",
  },
  ar: {
    Amman: "عمّان",
    Irbid: "إربد",
    Aqaba: "العقبة",
    Zarqa: "الزرقاء",
    Balqa: "البلقاء",
    Mafraq: "المفرق",
    Jerash: "جرش",
    Ajloun: "عجلون",
    Madaba: "مادبا",
    Karak: "الكرك",
    Tafilah: "الطفيلة",
    "Ma'an": "معان",
  },
} as const;

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createGovernoratePoints(
  feature: GovernorateFeature,
  config: CoverageConfig,
) {
  const random = seededRandom(config.seed);
  const [[minLongitude, minLatitude], [maxLongitude, maxLatitude]] =
    geoBounds(feature);
  const centroid = geoCentroid(feature);
  const anchor = geoContains(feature, config.anchor)
    ? config.anchor
    : centroid;
  const spread = config.spread;
  const points: Position[] = [];

  points.push(anchor);

  let attempts = 0;
  while (points.length < config.count && attempts < config.count * 90) {
    const angle = random() * Math.PI * 2;
    const radius = Math.pow(random(), 0.72);
    const candidate: Position = [
      anchor[0] + Math.cos(angle) * spread[0] * radius,
      anchor[1] + Math.sin(angle) * spread[1] * radius,
    ];

    if (geoContains(feature, candidate)) {
      points.push(candidate);
    }

    attempts += 1;
  }

  while (points.length < config.count && attempts < config.count * 180) {
    const candidate: Position = [
      minLongitude + random() * (maxLongitude - minLongitude),
      minLatitude + random() * (maxLatitude - minLatitude),
    ];

    if (geoContains(feature, candidate)) {
      points.push(candidate);
    }

    attempts += 1;
  }

  return points;
}

const jordanProjection = geoMercator().fitExtent(
  [
    [112, 28],
    [602, 650],
  ],
  jordanGovernorates,
);
const jordanPath = geoPath(jordanProjection);

const projectedCoveragePoints = jordanGovernorates.features.flatMap(
  (feature) => {
    const config = coverageConfig[feature.properties.shapeName];
    if (!config) return [];

    return createGovernoratePoints(feature, config)
      .map((coordinates, index) => ({
        id: `${feature.properties.shapeISO}-${index}`,
        name: feature.properties.shapeName,
        point: jordanProjection(coordinates),
      }))
      .filter(
        (
          item,
        ): item is {
          id: string;
          name: string;
          point: [number, number];
        } => Boolean(item.point),
      );
  },
);

function JordanReachMap({
  language,
  reach,
}: {
  language: Language;
  reach: (typeof content)[Language]["reach"];
}) {
  return (
    <div className="reach-map-visual">
      <svg
        className="jordan-map"
        viewBox="92 18 530 640"
        role="img"
        aria-label={reach.mapAria}
      >
        <title>{reach.mapAria}</title>
        <desc>{reach.mapDescription}</desc>

        <g className="jordan-governorates">
          {jordanGovernorates.features.map((feature) => {
            const name = feature.properties.shapeName;

            return (
              <path
                className="jordan-governorate"
                d={jordanPath(feature) ?? undefined}
                key={feature.properties.shapeID}
              >
                <title>
                  {
                    governorateNames[language][
                      name as keyof (typeof governorateNames)[Language]
                    ]
                  }
                </title>
              </path>
            );
          })}
        </g>

        <g className="coverage-points" aria-hidden="true">
          {projectedCoveragePoints.map(({ id, point }) => (
            <circle
              className="coverage-point"
              cx={point[0]}
              cy={point[1]}
              key={id}
              r="3.35"
            />
          ))}
        </g>
      </svg>

      <a
        className="reach-map-source"
        href="https://www.geoboundaries.org/"
        target="_blank"
        rel="noreferrer"
      >
        {language === "ar"
          ? "حدود الخريطة: geoBoundaries"
          : "Boundary data: geoBoundaries"}
      </a>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    window.localStorage.setItem("tads-language", language);
  }, [language, isArabic]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" dir={isArabic ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
      />

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="TA Drug Store">
            <img
              src="/assets/ta-logo-green.png"
              width="124"
              height="98"
              alt="TA Drug Store"
            />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {t.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="language-switch"
              type="button"
              onClick={toggleLanguage}
              aria-label={t.languageName}
            >
              <Icon name="globe" size={18} />
              <span>{t.languageCode}</span>
            </button>
            <a className="header-cta" href="#contact">
              {t.nav[t.nav.length - 1].label}
              <Icon name="arrow" size={18} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? t.closeLabel : t.menuLabel}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={25} />
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        >
          <div className="mobile-menu-inner">
            <nav aria-label="Mobile navigation">
              {t.nav.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                  <Icon name="arrow" size={19} />
                </a>
              ))}
            </nav>
            <button
              className="mobile-language-button"
              type="button"
              onClick={toggleLanguage}
            >
              <Icon name="globe" size={18} />
              {t.languageName}
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{t.hero.eyebrow}</p>
          <h1>
            {t.hero.titleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < t.hero.titleLines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="hero-body">{t.hero.body}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              {t.hero.primary}
              <Icon name="arrow" size={20} />
            </a>
            <a className="text-link" href="#capabilities">
              {t.hero.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-trust">
            <span>
              <Icon name="shield" size={18} />
              {t.hero.trust}
            </span>
            <i aria-hidden="true" />
            <span>
              <Icon name="pin" size={18} />
              {t.hero.location}
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/assets/tads-building-closed-doors-v7.webp"
            alt={t.hero.imageAlt}
          />
          <div className="hero-caption">
            <span className="caption-mark">
              <Icon name="building" size={21} />
            </span>
            <span>
              <small>TA Drug Store</small>
              <strong>{t.hero.location}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="metrics-band" aria-label="Company highlights">
        <div className="metrics-inner">
          {t.metrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section reach-section" id="reach">
        <div className="reach-layout">
          <div className="reach-copy">
            <p className="eyebrow">{t.reach.eyebrow}</p>
            <h2>{t.reach.title}</h2>
            <p>{t.reach.body}</p>
          </div>

          <JordanReachMap language={language} reach={t.reach} />
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-grid about-grid">
          <div className="about-visual reveal-frame">
            <img
              src="/assets/tads-operations-stocked-v2.webp"
              alt={t.about.imageAlt}
            />
            <div className="image-badge">
              <Icon name="building" size={23} />
              <span>{t.hero.location}</span>
            </div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
            <p className="section-lead">{t.about.body}</p>
            <blockquote>{t.about.quote}</blockquote>
            <div className="purpose-grid">
              {t.about.cards.map((card, index) => (
                <article key={card.title}>
                  <span>0{index + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="section-heading centered-heading">
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
          <p>{t.portfolio.body}</p>
        </div>
        <div className="category-list">
          {t.portfolio.categories.map((category) => (
            <article className="category-card" key={category.number}>
              <span className="category-number">{category.number}</span>
              <div className="category-icon">
                <Icon name="spark" size={24} />
              </div>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section capabilities-section" id="capabilities">
        <div className="section-heading capabilities-heading">
          <div>
            <p className="eyebrow">{t.capabilities.eyebrow}</p>
            <h2>{t.capabilities.title}</h2>
          </div>
          <p>{t.capabilities.body}</p>
        </div>

        <div className="capabilities-layout">
          <div className="capabilities-image reveal-frame">
            <img
              src="/assets/tads-warehouse-stocked-v2.webp"
              alt={t.capabilities.imageAlt}
            />
            <span className="operations-tag">
              <Icon name="shield" size={18} />
              {t.capabilities.qualityTag}
            </span>
          </div>

          <div className="audience-cards">
            <article className="audience-card supplier-card">
              <div className="audience-title">
                <span>
                  <Icon name="globe" size={25} />
                </span>
                <div>
                  <h3>{t.capabilities.supplierTitle}</h3>
                  <p>{t.capabilities.supplierText}</p>
                </div>
              </div>
              <ul>
                {t.capabilities.supplierItems.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="audience-card provider-card">
              <div className="audience-title">
                <span>
                  <Icon name="network" size={25} />
                </span>
                <div>
                  <h3>{t.capabilities.providerTitle}</h3>
                  <p>{t.capabilities.providerText}</p>
                </div>
              </div>
              <ul>
                {t.capabilities.providerItems.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section agencies-section" id="agencies">
        <div className="agencies-heading">
          <div>
            <p className="eyebrow">{t.agencies.eyebrow}</p>
            <h2>{t.agencies.title}</h2>
          </div>
          <p>{t.agencies.body}</p>
        </div>

        <div className="agency-cards">
          {t.agencies.items.map((agency, index) => (
            <article className="agency-card" key={agency.name}>
              <div className="agency-logo-frame">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img
                  src={agencyProfiles[index].src}
                  alt={agencyProfiles[index].alt}
                />
              </div>
              <div className="agency-card-copy">
                <div className="agency-owned-label">
                  <Icon name="shield" size={16} />
                  {t.agencies.representationLabel}
                </div>
                <p className="agency-category">{agency.category}</p>
                <h3>{agency.name}</h3>
                <p className="agency-description">{agency.description}</p>
                <a
                  className="agency-site-link"
                  href={agencyProfiles[index].website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t.agencies.websiteLabel}: ${agency.name}`}
                >
                  <span>{t.agencies.websiteLabel}</span>
                  <Icon name="arrow" size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partners-marquee-section" id="partners">
        <div className="partners-marquee-heading">
          <p className="eyebrow">{t.partners.eyebrow}</p>
          <h2>{t.partners.title}</h2>
        </div>
        <div className="logo-marquee" aria-label={t.partners.ariaLabel}>
          <div className="logo-marquee-track">
            {[0, 1].map((group) => (
              <div
                className="logo-marquee-group"
                aria-hidden={group === 1}
                key={group}
              >
                {partnerLogos.map((logo) => (
                  <figure className="partner-logo-card" key={logo.src}>
                    <img src={logo.src} alt={group === 0 ? logo.alt : ""} />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section values-section" id="values">
        <div className="section-heading centered-heading">
          <p className="eyebrow">{t.values.eyebrow}</p>
          <h2>{t.values.title}</h2>
        </div>
        <div className="values-grid">
          {t.values.items.map((value, index) => (
            <article key={value.title}>
              <span className="value-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-copy">
            <p className="eyebrow light-eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
            <div className="contact-ctas">
              <a
                className="button button-light"
                href="mailto:tads.jo@outlook.com"
              >
                <Icon name="mail" size={20} />
                {t.contact.emailCta}
              </a>
              <a className="button button-outline" href="tel:+962795672207">
                <Icon name="phone" size={20} />
                {t.contact.callCta}
              </a>
            </div>
          </div>

          <div className="contact-details">
            <article>
              <span className="contact-icon">
                <Icon name="pin" size={23} />
              </span>
              <div>
                <small>{t.contact.addressLabel}</small>
                <strong>{t.contact.address}</strong>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Al+Sahel+St%2C+Amman%2C+Jordan"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.contact.directions}
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </article>
            <article>
              <span className="contact-icon">
                <Icon name="phone" size={23} />
              </span>
              <div>
                <small>{t.contact.phoneLabel}</small>
                <a className="contact-value" href="tel:+962795672207" dir="ltr">
                  +962 79 567 2207
                </a>
              </div>
            </article>
            <article>
              <span className="contact-icon">
                <Icon name="mail" size={23} />
              </span>
              <div>
                <small>{t.contact.emailLabel}</small>
                <a
                  className="contact-value"
                  href="mailto:tads.jo@outlook.com"
                  dir="ltr"
                >
                  tads.jo@outlook.com
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" aria-label="TA Drug Store">
              <img
                src="/assets/ta-logo-white.png"
                width="116"
                height="91"
                alt="TA Drug Store"
              />
            </a>
            <div className="footer-brand-copy">
              <strong>{t.footer.legalName}</strong>
              <p>{t.footer.description}</p>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            {t.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="back-to-top" href="#top">
            {t.footer.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.footer.rights}
          </span>
          <span>{t.hero.location}</span>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href="https://wa.me/962795672207"
        target="_blank"
        rel="noreferrer"
        aria-label={`${t.contact.whatsappLabel}: +962 79 567 2207`}
      >
        <Icon name="chat" size={22} />
        <span>{t.contact.whatsappLabel}</span>
      </a>
    </main>
  );
}
