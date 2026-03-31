import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Premium Shared Hero Component style -->
    <section class="premium-hero" style="background-image: url('/hospital-building.jpg')">
        <div class="hero-overlay"></div>
        <div class="container hero-content fade-in">
            <span class="hero-badge">Latest Updates</span>
            <h1>Hospital <span class="highlight">News</span></h1>
            <p>Keep up with our latest medical advancements, community initiatives, and hospital announcements.</p>
            <div class="hero-divider"></div>
        </div>
    </section>

    <section class="section-padding container">
      
      <!-- List View -->
      <div *ngIf="!selectedPost" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        <div *ngFor="let post of newsArticles" (click)="viewPost(post)" class="news-card" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;">
          <div style="height: 220px; background-size: contain; background-repeat: no-repeat; background-position: center; background-color: #f8f9fa;" [style.backgroundImage]="'url(' + post.image + ')'"></div>
          
          <div style="padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="background: rgba(28, 48, 110, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">{{ post.category }}</span>
              <span style="color: var(--text-muted); font-size: 0.8rem;">{{ post.date }}</span>
            </div>
            
            <h3 style="color: var(--primary-dark); margin-bottom: 0.8rem; font-size: 1.3rem; line-height: 1.4;">{{ post.title }}</h3>
            <p style="color: var(--text-main); line-height: 1.6; margin-bottom: 1.5rem;">{{ post.summary }}</p>
            
            <a href="javascript:void(0)" style="color: var(--green); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
              Read Full Article <span style="font-size: 1.2rem;">→</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div *ngIf="selectedPost" class="fade-in" style="max-width: 800px; margin: 0 auto; background: white; padding: 3rem; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
        <button (click)="selectedPost = null" style="background: none; border: none; color: var(--primary); font-weight: 600; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 5px; margin-bottom: 2rem;">
            ← Back to News
        </button>
        
        <span style="background: rgba(28, 48, 110, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">{{ selectedPost.category }}</span>
        <span style="color: var(--text-muted); font-size: 0.9rem; margin-left: 1rem;">{{ selectedPost.date }}</span>
        
        <h1 style="color: var(--primary-dark); font-size: 2.2rem; margin: 1rem 0 1.5rem; line-height: 1.3;">{{ selectedPost.title }}</h1>
        <img [src]="selectedPost.image" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 12px; margin-bottom: 2rem;">
        
        <p style="color: var(--text-main); font-size: 1.1rem; line-height: 1.8;">{{ selectedPost.content || selectedPost.summary + ' We are proud to announce the latest updates regarding our commitment to healthcare excellence. Our facilities continue to expand to accommodate the growing needs of our patient community. This milestone represents a significant step forward in our mission, providing state-of-the-art medical solutions and comprehensive care under one roof. Thank you for trusting Memorial Souad Kafafi University Hospital with your health.' }}</p>
      </div>

    </section>
  `,
  styles: `
    .news-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
    }
    .news-card:hover img, .news-card:hover div[style*="backgroundImage"] {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
  `
})
export class NewsComponent {
    selectedPost: any = null;

    newsArticles = [
        {
            title: 'وزير التعليم العالي يتفقد مستشفى سعاد كفافي الجامعي',
            category: 'أخبار المستشفى',
            date: 'أحدث الأخبار',
            summary: 'على هامش اجتماع مجلس الجامعات الخاصة، تفقد الدكتور أيمن عاشور وزير التعليم العالي والبحث العلمي مستشفى سعاد كفافي الجامعي، مشيدًا بمستوى الخدمات الطبية.',
            content: 'على هامش اجتماع مجلس الجامعات الخاصة والذي استضافته جامعة مصر للعلوم والتكنولوجيا، تفقد الدكتور أيمن عاشور، وزير التعليم العالي والبحث العلمي مستشفي سعاد كفافي الجامعي، يرافقه الأستاذ خالد الطوخي رئيس مجلس أمناء جامعة مصر للعلوم والتكنولوجيا، والدكتور نهاد المحبوب القائم بأعمال رئيس الجامعة وعميد كلية الطب البشرى، والدكتور عبدالوهاب عزت أمين مجلس الجامعات الخاصة، والأستاذ محمد غانم رئيس الإدارة المركزية لأمانة المجالس.\n\nاشاد الدكتور أيمن عاشور بالمستوى المتميز للخدمات الطبية المقدمة بمستشفى سعاد كفافي، مشيرًا إلى أن المستشفى تتميز بوجود أجهزة طبية حديثة تساهم في تقديم رعاية صحية متكاملة للمرضى، ويعكس التزام الجامعة بدورها في خدمة المجتمع وتطوير التعليم الطبي.',
            image: '/minister-visit.png'
        },
        {
            title: 'جهاز الـ UVA أحدث طرق علاج الأمراض الجلدية',
            category: 'علاجات حديثة',
            date: 'متاح الآن',
            summary: 'ظهر جهاز UVA كخيار حديث لعلاج بعض الأمراض الجلدية المستعصية. يستخدم الجهاز أشعة محددة تساعد على تحسين حالة الجلد بشكل آمن مقارنةً بالطرق التقليدية.',
            content: 'ظهر جهاز UVA كخيار حديث لعلاج بعض الأمراض الجلدية المستعصية. \nيستخدم الجهاز أشعة محددة تساعد على تحسين حالة الجلد بشكل آمن وتحت إشراف طبي مع تقليل الأعراض الجانبية مقارنةً ببعض الطرق التقليدية.\n\nمميزات جهاز UVA:\n- تحديد دقيق للأشعة: الجهاز يصدر أشعة محددة بطول موجي معين، بحيث تستهدف الجلد المصاب فقط، وتقلل تأثيرها على الجلد السليم.\n- تحسن سريع في بعض الحالات: بعض المرضى يلاحظون تحسن في اللون أو التقشر بعد جلسات منتظمة، أسرع من بعض الطرق التقليدية.\n- أمان تحت إشراف طبي: يقلل من المضاعفات مقارنةً بالعلاج الذاتي أو استخدام أدوية قوية بدون متابعة.\n- يمكن دمجه مع علاجات أخرى: مثل المراهم الموضعية لزيادة الفعالية.\n- تقليل الأعراض المصاحبة: مثل الحكة أو الالتهاب في بعض الأمراض كالبهاق والصدفية.\n- غير جراحي: العلاج يتم بدون أي تدخل جراحي أو إبر، مما يجعله خيارًا أقل صعوبة للمريض.\n\nويعتبر جهاز الـ UVA أحدث طرق الحد من أعراض الأمراض الجلدية المستعصية.',
            image: '/uva-device.png'
        },

        {
            title: 'زيارة الخبير العالمي أ.د. محمد الزليلي لمركز جراحة العمود الفقري',
            category: 'زيارات طبية',
            date: 'Nov 2026',
            summary: 'سلامة الحركة تبدأ من عمود فقري مستقيم. يشرفنا تواجد أ.د. محمد الزليلي، رئيس جمعية إسطنبول للعمود الفقري، بمستشفى سعاد كفافي الجامعي من 19 حتى 22 نوفمبر.',
            content: 'سلامة الحركة تبدأ من عمود فقري مستقيم. يشرفنا زيارة وتواجد الطبيب العالمي أ. د. محمد الزليلي، رئيس جمعية إسطنبول للعمود الفقري ورئيس دورة العمود الفقري المتقدمة، في مستشفى سعاد كفافي الجامعي. ويشغل أ. د. محمد الزليلي أيضًا مناصب قيادية في الاتحاد العالمي لجراحة الأعصاب (WFNS)، حيث أنه رئيس مجلس إدارة لجنة التعليم والتدريب وعضو في اللجنة التنفيذية للمؤسسة. احصل على تشخيص دقيق منه وبادر بحجز موعدك الآن، سيتواجد الطبيب من يوم 19 حتى 22 نوفمبر. للحجز اتصل على 16111. \n\nExperience world-class spine care with Professor Mehmet Zileli, Chairman of the Istanbul Spine Masters meetings and the Dr. Mehmet Zileli Advanced Spine Course. Prof. Zileli will be at the Souad Kafafi University Hospital from November 19th to 22nd. He also serves as Chairman of the WFNS Education and Training Committee, Guest professor Saarland university Germany, and is an executive committee member of the WFNS Foundation. Don\'t miss this opportunity to consult with a global authority on spine surgery. For reservations, call us on 16111.',
            image: '/dr-zileli-visit.png'
        },
        {
            title: 'مستشفى سعاد كفافي الجامعي تحصل على الاعتماد المؤسسي من المجلس العربي للاختصاصات الصحية',
            category: 'إنجازات',
            date: 'Mar 2026',
            summary: '"قلعة الطب في مصر" .. مستشفى سعاد كفافي الجامعي تحصد الاعتماد المؤسسي من المجلس العربي للاختصاصات الصحية، كأول كلية طب بجامعة خاصة في مصر تنال هذا الاستحقاق المرموق، مما يعزز مكانتها كمركز متقدم للتدريب الطبي التخصصي.',
            image: '/achievement-arab-council.png'
        },
        {
            title: 'Annual Cardiology Conference 2025',
            category: 'Medical Event',
            date: 'Upcoming',
            summary: 'The Cardiology and Catheterization Department hosts its major conference sharing the latest insights and advancements in advanced diagnostic and interventional cardiac care.',
            image: '/5.jpeg'
        },
        {
            title: 'New Isolation Facility Opened in 6th of October City',
            category: 'Facility Expansion',
            date: 'Jan 2021',
            summary: 'The Minister of Higher Education and Scientific Research officially inaugurated a new isolation facility affiliated with Memorial Souad Kafafi University Hospital.',
            image: '/6.jpeg'
        },
        {
            title: 'Comprehensive Cardiovascular & Emergency Center Upgrades',
            category: 'Hospital Updates',
            date: 'Oct 2020',
            summary: 'Major renovations to our cardiac catheterization and 24/7 ER units are now fully operational, bringing world-class immediate response capabilities.',
            image: '/3.jpeg'
        },
        {
            title: 'Free Medical Convoys under "Decent Life" Initiative',
            category: 'Community Services',
            date: 'Jan 2019',
            summary: 'SKUH continues its long history of deploying medical convoys, most notably offering free clinics, surgeries, and treatments as part of the Haya Karima initiative.',
            image: '/4.jpeg'
        }
    ];

    viewPost(post: any) {
        this.selectedPost = post;
    }
}
