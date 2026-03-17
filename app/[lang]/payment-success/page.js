import { getDictionary } from '@/lib/i18n';

export default async function PaymentSuccess({ params }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);
  const t = dict.PaymentSuccess; // Access the PaymentSuccess object from the dictionary

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-green-600 mb-4">{t.title}</h1>
      <p className="text-lg text-gray-700">{t.message}</p>
      <a href={`/${lang}/`} className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">
        {t.returnHome}
      </a>
    </div>
  );
}
