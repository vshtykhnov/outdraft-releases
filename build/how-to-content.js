// Copy for /<lang>/how-to-use/<windows|linux>/. Steps are [heading, html] pairs; `os` limits a step to one OS.
// Button and status names must match the desktop app's own labels (client/ui/src/lib/i18n.ts in ../outdraft).
const FORM = 'https://tally.so/r/D4lK4E';
const TG = 'https://t.me/d2_outdraft';
const WIN_FILE = 'Outdraft-windows-x86_64.exe';
const LINUX_FILE = 'Outdraft-linux-x86_64.AppImage';
const RELEASES = 'https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/';

const linuxRun = `<pre><code>chmod +x ${LINUX_FILE}
./${LINUX_FILE}</code></pre>`;
const linuxPkgs = '<code>gstreamer1-plugin-pipewire</code> (Fedora), <code>gstreamer1.0-pipewire</code> (Ubuntu, Debian), <code>gst-plugin-pipewire</code> (Arch)';

module.exports = {
  en: {
    crumb: 'How to use', tag: 'Setup guide', other: 'Operating system',
    windows: {
      metaTitle: 'How to use Outdraft on Windows | Outdraft',
      title: 'How to use Outdraft on Windows',
      description: 'Install Outdraft on Windows, connect it to Dota 2 and use it in the draft and the match.',
      lead: 'Install, connect to Dota 2, play. Takes a couple of minutes.',
    },
    linux: {
      metaTitle: 'How to use Outdraft on Linux | Outdraft',
      title: 'How to use Outdraft on Linux',
      description: 'Run the Outdraft AppImage on Linux, connect it to Dota 2 and use it in the draft and the match.',
      lead: 'Run the AppImage, connect to Dota 2, play. Takes a couple of minutes.',
    },
    steps: [
      ['Install', `<p>Download <a href="${RELEASES}${WIN_FILE}"><code>${WIN_FILE}</code></a> and run it. It installs for your user only, no admin rights needed.</p>
<p>Windows SmartScreen or Edge may warn you: the app isn’t code-signed yet. In SmartScreen click <b>More info</b> → <b>Run anyway</b>; in Edge choose <b>Keep</b>.</p>
<p>Outdraft updates itself.</p>`, 'windows'],
      ['Install', `<p>Download <a href="${RELEASES}${LINUX_FILE}"><code>${LINUX_FILE}</code></a>, make it executable and run it:</p>
${linuxRun}
<p>You need a Wayland session and the GStreamer PipeWire plugin: ${linuxPkgs}.</p>
<p>Outdraft updates itself.</p>`, 'linux'],
      ['First run', `<p>Outdraft adds Dota’s Game State Integration file, so Dota can send it game data. <b>Restart Dota 2 once</b> after the first run.</p>
<p>When it works, the welcome card shows <b>✓ Connected to Dota 2</b>.</p>`],
      ['Dota settings', `<p>Set Dota to <b>Borderless window</b> or <b>Windowed</b>.</p>
<p>Any screen shape works: 4:3, 5:4, 16:10, 16:9, 21:9, including a 4:3 game stretched to full screen.</p>`, 'windows'],
      ['Dota settings', `<p>Set Dota to <b>Fullscreen</b> or <b>Borderless window</b>. A Dota window smaller than the monitor isn’t read.</p>
<p>Any screen shape works: 4:3, 5:4, 16:10, 16:9, 21:9, including a 4:3 game stretched to full screen.</p>`, 'linux'],
      ['Screen sharing', `<p>At your first draft a screen-sharing window appears. Choose the <b>monitor Dota is on</b>.</p>`, 'linux'],
      ['Using it', `<ul>
<li><b>Draft:</b> point at an empty seat to see its best heroes. Click to keep the list.</li>
<li><b>Match:</b> the <b>Game</b> view shows build, skills and farm.</li>
<li><b>Add Steam ID</b> to get bans against your hero pool.</li>
</ul>`],
      ['If Dota 2 isn’t found', `<p>In Outdraft click <b>Choose Dota 2 folder</b> and pick the folder named <code>dota 2 beta</code>.</p>
<p>To find it: in Steam open Dota 2, then <b>⚙ → Manage → Browse local files</b>. That opens exactly this folder.</p>`],
      ['Still not working?', `<p>Tell us what happens in the <a href="${FORM}" target="_blank" rel="noopener">feedback form</a> or ask in our <a href="${TG}" target="_blank" rel="noopener">Telegram community</a>.</p>`],
    ],
  },

  ru: {
    crumb: 'Инструкция', tag: 'Настройка', other: 'Операционная система',
    windows: {
      metaTitle: 'Как пользоваться Outdraft на Windows | Outdraft',
      title: 'Как пользоваться Outdraft на Windows',
      description: 'Установи Outdraft на Windows, подключи к Dota 2 и пользуйся им в драфте и в матче.',
      lead: 'Установи, подключи к Dota 2, играй. Пара минут.',
    },
    linux: {
      metaTitle: 'Как пользоваться Outdraft на Linux | Outdraft',
      title: 'Как пользоваться Outdraft на Linux',
      description: 'Запусти AppImage Outdraft на Linux, подключи к Dota 2 и пользуйся им в драфте и в матче.',
      lead: 'Запусти AppImage, подключи к Dota 2, играй. Пара минут.',
    },
    steps: [
      ['Установка', `<p>Скачай <a href="${RELEASES}${WIN_FILE}"><code>${WIN_FILE}</code></a> и запусти. Он ставится только для твоего пользователя, права администратора не нужны.</p>
<p>Windows SmartScreen или Edge могут предупредить: приложение пока без цифровой подписи. В SmartScreen нажми <b>Подробнее</b> → <b>Выполнить в любом случае</b>, в Edge — <b>Сохранить</b>.</p>
<p>Outdraft обновляется сам.</p>`, 'windows'],
      ['Установка', `<p>Скачай <a href="${RELEASES}${LINUX_FILE}"><code>${LINUX_FILE}</code></a>, сделай его исполняемым и запусти:</p>
${linuxRun}
<p>Нужны сессия Wayland и плагин GStreamer для PipeWire: ${linuxPkgs}.</p>
<p>Outdraft обновляется сам.</p>`, 'linux'],
      ['Первый запуск', `<p>Outdraft добавляет файл Game State Integration, чтобы Dota передавала ему данные игры. <b>Перезапусти Dota 2 один раз</b> после первого запуска.</p>
<p>Когда всё работает, на стартовой карточке видно <b>✓ Dota 2 подключена</b>.</p>`],
      ['Настройки Dota', `<p>Включи в Dota режим <b>окно без рамки</b> или <b>оконный</b>.</p>
<p>Подходит любой формат экрана: 4:3, 5:4, 16:10, 16:9, 21:9, в том числе 4:3, растянутый на весь экран.</p>`, 'windows'],
      ['Настройки Dota', `<p>Включи в Dota <b>полноэкранный</b> режим или <b>окно без рамки</b>. Окно Dota меньше монитора не читается.</p>
<p>Подходит любой формат экрана: 4:3, 5:4, 16:10, 16:9, 21:9, в том числе 4:3, растянутый на весь экран.</p>`, 'linux'],
      ['Доступ к экрану', `<p>На первом драфте появится окно доступа к экрану. Выбери <b>монитор, на котором Dota</b>.</p>`, 'linux'],
      ['Как пользоваться', `<ul>
<li><b>Драфт:</b> наведи на пустой слот, чтобы увидеть лучших героев для него. Кликни, чтобы закрепить список.</li>
<li><b>Матч:</b> во вкладке <b>Игра</b> — сборка, скиллы и фарм.</li>
<li><b>Добавить Steam ID</b> — баны против твоего пула героев.</li>
</ul>`],
      ['Если Dota 2 не найдена', `<p>В Outdraft нажми <b>Выбрать папку Dota 2</b> и выбери папку <code>dota 2 beta</code>.</p>
<p>Где она: в Steam открой Dota 2, затем <b>⚙ → Управление → Просмотреть локальные файлы</b>. Откроется именно эта папка.</p>`],
      ['Всё ещё не работает?', `<p>Опиши, что происходит, в <a href="${FORM}" target="_blank" rel="noopener">форме обратной связи</a> или спроси в нашем <a href="${TG}" target="_blank" rel="noopener">Telegram-сообществе</a>.</p>`],
    ],
  },

  uk: {
    crumb: 'Інструкція', tag: 'Налаштування', other: 'Операційна система',
    windows: {
      metaTitle: 'Як користуватися Outdraft на Windows | Outdraft',
      title: 'Як користуватися Outdraft на Windows',
      description: 'Встанови Outdraft на Windows, підключи до Dota 2 і користуйся ним у драфті та в матчі.',
      lead: 'Встанови, підключи до Dota 2, грай. Кілька хвилин.',
    },
    linux: {
      metaTitle: 'Як користуватися Outdraft на Linux | Outdraft',
      title: 'Як користуватися Outdraft на Linux',
      description: 'Запусти AppImage Outdraft на Linux, підключи до Dota 2 і користуйся ним у драфті та в матчі.',
      lead: 'Запусти AppImage, підключи до Dota 2, грай. Кілька хвилин.',
    },
    steps: [
      ['Встановлення', `<p>Завантаж <a href="${RELEASES}${WIN_FILE}"><code>${WIN_FILE}</code></a> і запусти. Він встановлюється лише для твого користувача, права адміністратора не потрібні.</p>
<p>Windows SmartScreen або Edge можуть попередити: застосунок поки без цифрового підпису. У SmartScreen натисни <b>Докладніше</b> → <b>Усе одно запустити</b>, в Edge — <b>Зберегти</b>.</p>
<p>Outdraft оновлюється сам.</p>`, 'windows'],
      ['Встановлення', `<p>Завантаж <a href="${RELEASES}${LINUX_FILE}"><code>${LINUX_FILE}</code></a>, зроби його виконуваним і запусти:</p>
${linuxRun}
<p>Потрібні сесія Wayland і плагін GStreamer для PipeWire: ${linuxPkgs}.</p>
<p>Outdraft оновлюється сам.</p>`, 'linux'],
      ['Перший запуск', `<p>Outdraft додає файл Game State Integration, щоб Dota передавала йому дані гри. <b>Перезапусти Dota 2 один раз</b> після першого запуску.</p>
<p>Коли все працює, на стартовій картці видно <b>✓ Dota 2 підключено</b>.</p>`],
      ['Налаштування Dota', `<p>Увімкни в Dota режим <b>вікно без рамки</b> або <b>віконний</b>.</p>
<p>Підходить будь-який формат екрана: 4:3, 5:4, 16:10, 16:9, 21:9, зокрема 4:3, розтягнутий на весь екран.</p>`, 'windows'],
      ['Налаштування Dota', `<p>Увімкни в Dota <b>повноекранний</b> режим або <b>вікно без рамки</b>. Вікно Dota, менше за монітор, не читається.</p>
<p>Підходить будь-який формат екрана: 4:3, 5:4, 16:10, 16:9, 21:9, зокрема 4:3, розтягнутий на весь екран.</p>`, 'linux'],
      ['Доступ до екрана', `<p>На першому драфті з’явиться вікно доступу до екрана. Обери <b>монітор, на якому Dota</b>.</p>`, 'linux'],
      ['Як користуватися', `<ul>
<li><b>Драфт:</b> наведи на порожній слот, щоб побачити найкращих героїв для нього. Клацни, щоб закріпити список.</li>
<li><b>Матч:</b> у вкладці <b>Гра</b> — збірка, скіли та фарм.</li>
<li><b>Додати Steam ID</b> — бани проти твого пулу героїв.</li>
</ul>`],
      ['Якщо Dota 2 не знайдено', `<p>В Outdraft натисни <b>Вибрати папку Dota 2</b> і обери папку <code>dota 2 beta</code>.</p>
<p>Де вона: у Steam відкрий Dota 2, потім <b>⚙ → Керування → Переглянути локальні файли</b>. Відкриється саме ця папка.</p>`],
      ['Досі не працює?', `<p>Опиши, що відбувається, у <a href="${FORM}" target="_blank" rel="noopener">формі зворотного зв’язку</a> або запитай у нашій <a href="${TG}" target="_blank" rel="noopener">Telegram-спільноті</a>.</p>`],
    ],
  },
};
