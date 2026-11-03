/**
 * Real-device screenshots of the Android client's native UI.
 *
 * Captured from a physical Huawei device running `co.moco.odooclient.gms`,
 * cropped to the app window (status bar and gesture bar removed) and scaled to
 * 720px wide.
 *
 * Mix of the client's own screens (sign-in, accounts, settings, printer) and the
 * embedded Odoo views it renders (inventory). What the native side adds over a
 * browser or the official Odoo app: multi-account sign-in, auto-login, learning
 * mode, hardware-key scanning, Bluetooth/IPP printing and the on-device print
 * service.
 *
 * Order follows the user's journey, grouped by area: getting in (sign in,
 * accounts, discuss) -> warehouse work (inventory board, receipt) ->
 * configuration (app settings, scanning options, printer).
 *
 * Copy lives here rather than in `locales/*.json` to keep the section
 * self-contained, mirroring `featuresList.js` / `faqsList.js`.
 */
export const ScreenshotsList = {
	SHOTS_EN: {
		h2: 'Screens',
		h3: 'App screens',
		description: 'Every screenshot below was captured on a physical Android phone.',
		items: [
			{ src: '/screenshots/login.png', title: 'Sign in', description: 'Server address, username and password in one form, with an option to remember the password.' },
			{ src: '/screenshots/accounts.png', title: 'Accounts', description: 'Several Odoo instances and several users in one list, switchable at any time.' },
			{ src: '/screenshots/discuss.png', title: 'Discuss & channels', description: 'Channels, direct chats and meetings in one list; new messages arrive as native notifications.' },
			{ src: '/screenshots/inventory.png', title: 'Inventory overview', description: 'Receipts, quality control, storage and delivery counts — including what is late — on one screen.' },
			{ src: '/screenshots/receipt.png', title: 'Stock receipt', description: 'Scan products onto the receipt, check quantities and validate — it writes straight back to Odoo.' },
			{ src: '/screenshots/settings.png', title: 'App settings', description: 'Follow-system or dark theme, printer address, on-device print service, cache and log reports.' },
			{ src: '/screenshots/odoo-settings.png', title: 'Scanning & login options', description: 'Auto-login, learning mode, a scan button on the nav bar, volume-key scanning and more.' },
			{ src: '/screenshots/printer-ip.png', title: 'IPP printer setup', description: 'Point the app at a network printer, read its attributes and pick paper, colour and duplex defaults.' },
		],
	},

	SHOTS_ZH: {
		h2: '界面预览',
		h3: '客户端界面',
		description: '全部截取自 Android 真机。',
		items: [
			{ src: '/screenshots/login.png', title: '登录', description: '服务端地址、用户名与密码一次填好，可勾选记住密码免重复输入。' },
			{ src: '/screenshots/accounts.png', title: '账号管理', description: '多个 Odoo 实例、多个账号集中在一个列表里，随时切换或删除。' },
			{ src: '/screenshots/discuss.png', title: '讨论与频道', description: '频道、私聊与会议分组一屏看清，新消息由客户端原生推送提醒。' },
			{ src: '/screenshots/inventory.png', title: '库存看板', description: '收货、质检、存储、出库各环节的待办与逾期数量，一屏掌握。' },
			{ src: '/screenshots/receipt.png', title: '库存收货单', description: '扫码加入商品、核对数量，点 Validate 即实时回写 Odoo。' },
			{ src: '/screenshots/settings.png', title: 'App 设置', description: '跟随系统或暗黑主题、打印机地址、云端打印服务、缓存清理与日志报告。' },
			{ src: '/screenshots/odoo-settings.png', title: '扫码与登录选项', description: '自动登录、学习模式、导航栏扫码按钮、音量键开关扫码，都可在客户端里开关。' },
			{ src: '/screenshots/printer-ip.png', title: 'IPP 网络打印机', description: '直接填写打印机地址，读取设备属性，并设置纸型、彩色模式与单双面。' },
		],
	},

	SHOTS_JA: {
		h2: '画面',
		h3: 'アプリの画面',
		description: 'すべて Android 実機で撮影しました。',
		items: [
			{ src: '/screenshots/login.png', title: 'ログイン', description: 'サーバーアドレス・ユーザー名・パスワードを 1 画面で入力。パスワードの記憶にも対応します。' },
			{ src: '/screenshots/accounts.png', title: 'アカウント管理', description: '複数の Odoo インスタンスと複数ユーザーを 1 つのリストで管理し、いつでも切り替えられます。' },
			{ src: '/screenshots/discuss.png', title: 'ディスカッションとチャンネル', description: 'チャンネル・DM・会議を一覧で表示。新着メッセージはアプリのネイティブ通知で届きます。' },
			{ src: '/screenshots/inventory.png', title: '在庫ダッシュボード', description: '入荷・品質管理・保管・出荷の件数と遅延を 1 画面で確認できます。' },
			{ src: '/screenshots/receipt.png', title: '入荷伝票', description: 'バーコードで商品を追加し数量を確認。Validate で Odoo に即時反映されます。' },
			{ src: '/screenshots/settings.png', title: 'アプリ設定', description: 'システム連動／ダークテーマ、プリンターのアドレス、クラウド印刷、キャッシュ削除、ログレポート。' },
			{ src: '/screenshots/odoo-settings.png', title: 'ログインとスキャンの設定', description: '自動ログイン、学習モード、ナビゲーションバーのスキャンボタン、音量キーでのスキャンを切り替えられます。' },
			{ src: '/screenshots/printer-ip.png', title: 'IPP プリンター設定', description: 'ネットワークプリンターのアドレスを入力し、属性を読み取って用紙・カラー・両面の既定値を設定します。' },
		],
	},

	SHOTS_ES: {
		h2: 'Pantallas',
		h3: 'Pantallas de la app',
		description: 'Todas las capturas están tomadas en un Android real.',
		items: [
			{ src: '/screenshots/login.png', title: 'Iniciar sesión', description: 'Dirección del servidor, usuario y contraseña en un solo formulario, con opción de recordar la contraseña.' },
			{ src: '/screenshots/accounts.png', title: 'Cuentas', description: 'Varias instancias de Odoo y varios usuarios en una sola lista, intercambiables en cualquier momento.' },
			{ src: '/screenshots/discuss.png', title: 'Discusiones y canales', description: 'Canales, chats directos y reuniones en una lista; los mensajes nuevos llegan como notificación nativa.' },
			{ src: '/screenshots/inventory.png', title: 'Panel de inventario', description: 'Recepciones, control de calidad, almacenaje y entregas, incluidos los retrasos, en una pantalla.' },
			{ src: '/screenshots/receipt.png', title: 'Recepción de stock', description: 'Escanea productos en la recepción, comprueba cantidades y valida; se escribe directamente en Odoo.' },
			{ src: '/screenshots/settings.png', title: 'Ajustes de la app', description: 'Tema del sistema u oscuro, dirección de impresora, impresión en la nube, caché e informes de registro.' },
			{ src: '/screenshots/odoo-settings.png', title: 'Escaneo e inicio de sesión', description: 'Inicio automático, modo aprendizaje, botón de escaneo en la barra y escaneo con las teclas de volumen.' },
			{ src: '/screenshots/printer-ip.png', title: 'Impresora IPP', description: 'Indica la dirección de la impresora, lee sus atributos y define papel, color y doble cara.' },
		],
	},

	SHOTS_RU: {
		h2: 'Экраны',
		h3: 'Экраны приложения',
		description: 'Все снимки сделаны на реальном Android-устройстве.',
		items: [
			{ src: '/screenshots/login.png', title: 'Вход', description: 'Адрес сервера, имя пользователя и пароль в одной форме, с возможностью запомнить пароль.' },
			{ src: '/screenshots/accounts.png', title: 'Учётные записи', description: 'Несколько экземпляров Odoo и несколько пользователей в одном списке, переключение в любой момент.' },
			{ src: '/screenshots/discuss.png', title: 'Обсуждения и каналы', description: 'Каналы, личные чаты и встречи в одном списке; новые сообщения приходят как нативные уведомления.' },
			{ src: '/screenshots/inventory.png', title: 'Панель склада', description: 'Поступления, контроль качества, хранение и отгрузки с просрочками — на одном экране.' },
			{ src: '/screenshots/receipt.png', title: 'Приёмка на склад', description: 'Сканируйте товары в приёмке, проверяйте количество и подтверждайте — данные сразу уходят в Odoo.' },
			{ src: '/screenshots/settings.png', title: 'Настройки приложения', description: 'Системная или тёмная тема, адрес принтера, облачная печать, кэш и отчёты.' },
			{ src: '/screenshots/odoo-settings.png', title: 'Сканирование и вход', description: 'Автовход, режим обучения, кнопка сканера в панели навигации и запуск кнопками громкости.' },
			{ src: '/screenshots/printer-ip.png', title: 'Сетевой принтер IPP', description: 'Укажите адрес принтера, прочитайте его свойства и задайте бумагу, цвет и двустороннюю печать.' },
		],
	},
};
