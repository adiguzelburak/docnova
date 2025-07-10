import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      back: "Back",
      invoiceList: "Invoice List",

      invoiceDetails: "Invoice Details",
      invoiceSummary: "Invoice Summary",
      supplierInformation: "Supplier Information",
      customerInformation: "Customer Information",
      financialDetails: "Financial Details",
      additionalInformation: "Additional Information",
      paymentStatus: "Payment Status",

      invoiceNumber: "Invoice Number",
      totalAmount: "Total Amount",
      issueDate: "Issue Date",
      dueDate: "Due Date",
      companyName: "Company Name",
      customerName: "Customer Name",
      vatNumber: "VAT Number",
      country: "Country",
      endpoint: "Endpoint",
      lineExtensionAmount: "Line Extension Amount",
      taxExclusiveAmount: "Tax Exclusive Amount",
      taxInclusiveAmount: "Tax Inclusive Amount",
      payableAmount: "Payable Amount",
      status: "Status",
      paidAmount: "Paid Amount",
      remainingAmount: "Remaining Amount",
      documentType: "Document Type",
      type: "Type",
      source: "Source",
      currency: "Currency",
      sendViaPeppol: "Send via PEPPOL",
      createdDate: "Created Date",
      lastUpdated: "Last Updated",
      deliveryDate: "Delivery Date",

      yes: "Yes",
      no: "No",
      unknown: "UNKNOWN",
      notAvailable: "N/A",

      invoiceNotFound: "Invoice Not Found",
      invoiceNotFoundDesc: "The invoice you're looking for doesn't exist.",
      goBack: "Go Back",

      language: "Language",
      english: "English",
      turkish: "Turkish",

      switchToDark: "Dark Mode",
      switchToLight: "Light Mode",

      name: "Name",
      platform: "Platform",
      action: "Action",
      details: "Details",
      createdTime: "Created Time",
      supplierVat: "Supplier VAT",
      customerVat: "Customer VAT",

      email: "Email",
      password: "Password",
      loggingIn: "Logging in...",
      login: "Login",
      logout: "Logout",
    },
  },
  tr: {
    translation: {
      back: "Geri",
      invoiceList: "Fatura Listesi",

      invoiceDetails: "Fatura Detayları",
      invoiceSummary: "Fatura Özeti",
      supplierInformation: "Tedarikçi Bilgileri",
      customerInformation: "Müşteri Bilgileri",
      financialDetails: "Mali Detaylar",
      additionalInformation: "Ek Bilgiler",
      paymentStatus: "Ödeme Durumu",

      invoiceNumber: "Fatura Numarası",
      totalAmount: "Toplam Tutar",
      issueDate: "Düzenlenme Tarihi",
      dueDate: "Vade Tarihi",
      companyName: "Şirket Adı",
      customerName: "Müşteri Adı",
      vatNumber: "Vergi Numarası",
      country: "Ülke",
      endpoint: "Endpoint",
      lineExtensionAmount: "Satır Uzatma Tutarı",
      taxExclusiveAmount: "Vergisiz Tutar",
      taxInclusiveAmount: "Vergili Tutar",
      payableAmount: "Ödenecek Tutar",
      status: "Durum",
      paidAmount: "Ödenen Tutar",
      remainingAmount: "Kalan Tutar",
      documentType: "Belge Türü",
      type: "Tip",
      source: "Kaynak",
      currency: "Para Birimi",
      sendViaPeppol: "PEPPOL ile Gönder",
      createdDate: "Oluşturulma Tarihi",
      lastUpdated: "Son Güncelleme",
      deliveryDate: "Teslimat Tarihi",

      yes: "Evet",
      no: "Hayır",
      unknown: "BİLİNMİYOR",
      notAvailable: "Mevcut Değil",

      invoiceNotFound: "Fatura Bulunamadı",
      invoiceNotFoundDesc: "Aradığınız fatura mevcut değil.",
      goBack: "Geri Dön",

      language: "Dil",
      english: "İngilizce",
      turkish: "Türkçe",

      switchToDark: "Karanlık Mod",
      switchToLight: "Aydınlık Mod",

      name: "Ad",
      platform: "Platform",
      action: "İşlem",
      details: "Detaylar",
      createdTime: "Oluşturulma Zamanı",
      supplierVat: "Tedarikçi Vergi No",
      customerVat: "Müşteri Vergi No",

      email: "Email",
      password: "Şifre",
      loggingIn: "Giriş Yapılıyor...",
      login: "Giriş Yap",
      logout: "Çıkış Yap",
    },
  },
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

  detection: {
    order: ["localStorage"],
    caches: ["localStorage"],
  },
});

export default i18n;
