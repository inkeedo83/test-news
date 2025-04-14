import React from "react";

const WhoAreWe = () => {
  const content = {
    title: "من نحن",
    description: `نحن صحيفة إلكترونية متخصصة في تغطية أخبار المملكة البلجيكية. نلتزم بتقديم تغطية شاملة ومحايدة للأحداث السياسية والاقتصادية والاجتماعية في بلجيكا.

                                                رؤيتنا هي أن نكون المصدر الموثوق الأول للأخبار البلجيكية، مع التركيز على:
                                                • تغطية شاملة للأحداث المحلية في بلجيكا
                                                • متابعة العلاقات البلجيكية الدولية
                                                • تقديم تحليلات معمقة للشأن البلجيكي
                                                
                                                نلتزم بأعلى معايير المهنية الصحفية لتقديم محتوى إخباري دقيق وموضوعي يخدم القراء المهتمين بالشأن البلجيكي.`,
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-36"
    >
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white text-right">
            {content.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none text-right"></div>
          {content.description.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-right"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
