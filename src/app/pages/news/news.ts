import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="premium-hero">
        <div class="hero-slide" *ngFor="let img of heroImages; let i = index" 
             [class.active]="currentHeroIndex === i" 
             [style.backgroundImage]="'url(' + img + ')'">
        </div>

        <div class="hero-overlay"></div>

        <button class="slider-btn prev" (click)="prevSlide()">
            <span>‹</span>
        </button>
        <button class="slider-btn next" (click)="nextSlide()">
            <span>›</span>
        </button>

        <div class="slider-dots">
            <div class="dot" *ngFor="let img of heroImages; let i = index" 
                 [class.active]="currentHeroIndex === i" 
                 (click)="goToSlide(i)">
            </div>
        </div>

        <div class="container hero-content fade-in">
            <span class="hero-badge">Latest Updates</span>
            <h1>Hospital <span class="highlight">News</span></h1>
            <p>Keep up with our latest medical advancements, community initiatives, and hospital announcements.</p>
            <div class="hero-divider"></div>
        </div>
    </section>

    <section class="section-padding container">
      
      <div *ngIf="!selectedPost" class="news-grid">
        <div *ngFor="let post of newsArticles" (click)="viewPost(post)" class="news-card">
          <div class="card-img" [style.backgroundImage]="'url(' + post.image + ')'"></div>
          
          <div class="card-body">
            <div class="card-meta">
              <span class="category-tag">{{ post.category }}</span>
              <span class="post-date">{{ post.date }}</span>
            </div>
            
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-summary">{{ post.summary }}</p>
            
            <a href="javascript:void(0)" class="read-more">
              Read Full Article <span>→</span>
            </a>
          </div>
        </div>
      </div>

      <div *ngIf="selectedPost" class="fade-in detail-view">
        <button (click)="selectedPost = null" class="back-btn">
            ← Back to News
        </button>
        
        <div class="detail-meta">
            <span class="category-tag">{{ selectedPost.category }}</span>
            <span class="detail-date">{{ selectedPost.date }}</span>
        </div>
        
        <h1 class="detail-title">{{ selectedPost.title }}</h1>
        <img [src]="selectedPost.image" class="detail-img">
        
        <div class="detail-content">
            <p>{{ selectedPost.content || selectedPost.summary }}</p>
            <p *ngIf="!selectedPost.content">
                We are proud to announce the latest updates regarding our commitment to healthcare excellence. 
                Our facilities continue to expand to accommodate the growing needs of our patient community. 
                This milestone represents a significant step forward in our mission, providing state-of-the-art 
                medical solutions and comprehensive care under one roof.
            </p>
        </div>
      </div>

    </section>
  `,
  styles: [`
    /* Hero Slider Container */
    .premium-hero {
        position: relative;
        height: 550px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
    }

    /* Individual Slides */
    .hero-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transition: opacity 1.2s ease-in-out;
        z-index: 1;
    }

    .hero-slide.active {
        opacity: 1;
    }

    /* Dark Overlay for Text Readability */
    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
        z-index: 2;
    }

    .hero-content {
        position: relative;
        z-index: 3;
        max-width: 800px;
    }

    /* Slider Controls */
    .slider-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255,255,255,0.3);
        width: 54px;
        height: 54px;
        border-radius: 50%;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slider-btn:hover { background: #00a76f; border-color: #00a76f; }
    .prev { left: 40px; }
    .next { right: 40px; }

    .slider-dots {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        z-index: 10;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        cursor: pointer;
        transition: 0.4s;
    }

    .dot.active {
        background: #00a76f;
        width: 35px;
        border-radius: 10px;
    }

    /* News Grid */
    .news-grid {
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
        gap: 2.5rem;
        margin-top: 3rem;
    }

    .news-card {
        background: white; 
        border-radius: 20px; 
        overflow: hidden; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    .news-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }

    .card-img {
        height: 230px; 
        background-size: cover; 
        background-position: center;
    }

    .card-body { padding: 1.8rem; }
    .card-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
    
    .category-tag {
        background: rgba(0, 167, 111, 0.1); 
        color: #00a76f; 
        padding: 5px 14px; 
        border-radius: 20px; 
        font-size: 0.75rem; 
        font-weight: 700;
        text-transform: uppercase;
    }

    .post-title { color: #1c306e; margin-bottom: 0.8rem; font-size: 1.25rem; line-height: 1.4; font-weight: 700; }
    .post-summary { color: #637381; font-size: 0.95rem; line-height: 1.6; }
    .read-more { color: #00a76f; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; margin-top: 1.5rem; }

    /* Detail View Styling */
    .detail-view { max-width: 900px; margin: 0 auto; background: white; padding: 4rem; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
    .back-btn { background: none; border: none; color: #1c306e; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; margin-bottom: 2.5rem; font-size: 1rem; }
    .detail-img { width: 100%; border-radius: 20px; margin: 2.5rem 0; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .detail-title { color: #1c306e; font-size: 2.6rem; line-height: 1.2; font-weight: 800; }
    .detail-content { color: #454f5b; font-size: 1.2rem; line-height: 1.9; white-space: pre-wrap; }
    .detail-date { color: #919eab; font-size: 1rem; margin-left: 1rem; }

    /* Global Helpers */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section-padding { padding: 80px 0; }
    .highlight { color: #00a76f; }
    .hero-badge { background: #00a76f; color: white; padding: 6px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem; display: inline-block; }
    .hero-divider { width: 60px; height: 4px; background: #00a76f; margin: 20px auto 0; border-radius: 2px; }
  `]
})
export class NewsComponent implements OnInit, OnDestroy {
  selectedPost: any = null;
  currentHeroIndex = 0;
  slideInterval: any;

  // Update these paths to your actual images
  heroImages: string[] = [
    '/minister-visit.png',
    '/uva-device.png',
    '/dr-zileli-visit.png'
  ];

  newsArticles = [
    {
      title: 'وزير التعليم العالي يتفقد مستشفى سعاد كفافي الجامعي',
      category: 'أخبار المستشفى',
      date: 'أحدث الأخبار',
      summary: 'على هامش اجتماع مجلس الجامعات الخاصة، تفقد الدكتور أيمن عاشور وزير التعليم العالي والبحث العلمي مستشفى سعاد كفافي الجامعي، مشيدًا بمستوى الخدمات الطبية.',
      content: 'على هامش اجتماع مجلس الجامعات الخاصة والذي استضافته جامعة مصر للعلوم والتكنولوجيا، تفقد الدكتور أيمن عاشور، وزير التعليم العالي والبحث العلمي مستشفي سعاد كفافي الجامعي، يرافقه الأستاذ خالد الطوخي رئيس مجلس أمناء جامعة مصر للعلوم والتكنولوجيا، والدكتور نهاد المحبوب القائم بأعمال رئيس الجامعة وعميد كلية الطب البشرى، والدكتور عبدالوهاب عزت أمين مجلس الجامعات الخاصة، والأستاذ محمد غانم رئيس الإدارة المركزية لأمانة المجالس.',
      image: '/minister-visit.png'
    },
    {
      title: 'جهاز الـ UVA أحدث طرق علاج الأمراض الجلدية',
      category: 'علاجات حديثة',
      date: 'متاح الآن',
      summary: 'ظهر جهاز UVA كخيار حديث لعلاج بعض الأمراض الجلدية المستعصية. يستخدم الجهاز أشعة محددة تساعد على تحسين حالة الجلد بشكل آمن.',
      content: 'ظهر جهاز UVA كخيار حديث لعلاج بعض الأمراض الجلدية المستعصية. يستخدم الجهاز أشعة محددة تساعد على تحسين حالة الجلد بشكل آمن وتحت إشراف طبي مع تقليل الأعراض الجانبية مقارنةً ببعض الطرق التقليدية.',
      image: '/uva-device.png'
    },
    {
        title: 'زيارة الخبير العالمي أ.د. محمد الزليلي لمركز جراحة العمود الفقري',
        category: 'زيارات طبية',
        date: 'Nov 2026',
        summary: 'سلامة الحركة تبدأ من عمود فقري مستقيم. يشرفنا تواجد أ.د. محمد الزليلي، رئيس جمعية إسطنبول للعمود الفقري، بمستشفى سعاد كفافي الجامعي.',
        image: '/dr-zileli-visit.png'
    },
    {
        title: 'مستشفى سعاد كفافي الجامعي تحصل على الاعتماد المؤسسي',
        category: 'إنجازات',
        date: 'Mar 2026',
        summary: 'مستشفى سعاد كفافي الجامعي تحصد الاعتماد المؤسسي من المجلس العربي للاختصاصات الصحية، كأول كلية طب بجامعة خاصة في مصر.',
        image: '/achievement-arab-council.png'
    }
  ];

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  // --- Slider Logic ---
  startTimer() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 seconds interval
  }

  stopTimer() {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  nextSlide() {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
  }

  prevSlide() {
    this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroImages.length) % this.heroImages.length;
  }

  goToSlide(index: number) {
    this.currentHeroIndex = index;
    this.resetTimer();
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }

  // --- View Logic ---
  viewPost(post: any) {
    this.selectedPost = post;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}