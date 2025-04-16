import React from "react";

function PrivacyPolicy() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 pt-72 py-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          سياسة الخصوصية
        </h1>
        <div
          className="prose dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
          dir="rtl"
        >
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            نحن في مراسل بلجيكا نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح
            هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-100">
            جمع المعلومات
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            نقوم بجمع المعلومات التي تقدمها مباشرة عند:
            <ul className="list-disc mr-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>الاشتراك في نشرتنا الإخبارية</li>
              <li>التواصل معنا</li>
            </ul>
          </p>

          {/* Rest of the content with same pattern */}
          {/* ... */}
        </div>

        <p className="mt-6"></p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به
          والتعديل والإفصاح.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-100">
          {" "}
          ملفات الكوكيز{" "}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          ملفات الكوكيز ملف تعريف الارتباط هو ملف نصي يتم وضعه على محرك الأقراص
          الثابتة بواسطة خادم صفحة ويب. لا يمكن لملفات تعريف الارتباط تشغيل
          برامج أو وضع فيروسات على جهاز الكمبيوتر الخاص بك. وهي تنسب إليك بشكل
          فردي. لا يمكن قراءة ملفات تعريف الارتباط في هذا الموقع إلا بواسطة هذا
          الموقع. وتتمثل المهمة الرئيسية لملفات تعريف الارتباط في تسهيل التنقل
          وتوفير الوقت. تقبل معظم متصفحات الويب ملفات تعريف الارتباط تلقائيا.
          ومع ذلك، لا يزال من الممكن بالنسبة لك لتعديل إعدادات متصفحك لرفضها.
          وتستخدم ملفات تعريف الارتباط أيضا في التتبع الإحصائي للزيارات إلى هذا
          الموقع. استخدامات البيانات كمثل المواقع الأخرى فأن ملفات الكوكيز لا
          تستخدم لتخزين المعلومات، فهيه محصورة في سجل للمستخدم بمعلومات محددة عن
          الصفحات التي وصل إليها أو زارها سابقاً، حيث تخصص محتوى الصفحة استناداً
          إلى نوع متصفح الزائر أو معلومات أخرى يتم إرسالها.
        </p>
        <p className="mt-6">
          <strong className="text-gray-900 dark:text-white">
            تاريخ آخر تحديث: 2025-04-14
          </strong>
        </p>
        <p className="mt-6">
          <strong className="text-gray-900 dark:text-white">
            مراسل بلجيكا
          </strong>
          <br />
        </p>
        <p className="mt-6 text-gray-700 dark:text-gray-300 pb-4">
          إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية الخاصة بنا، فلا
          تتردد في الاتصال بنا عبر صفحة "اتصل بنا".
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicy;
