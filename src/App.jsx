import { useState } from "react";

// ── COLOURS ──────────────────────────────────────────────────────
const C = {
  bg:"#FAF8F6", card:"#FFFFFF", border:"#E8E0D8",
  sidebar:"#B8AB9E", text:"#2C2420", sub:"#9C8E84", mute:"#C2B6AC",
  pink:"#C2A28E", pinkLight:"#F4EEE6", pinkDark:"#9C7A62",
  green:"#7C9583", greenLight:"#EEF3EF",
  red:"#CC5C5C", redLight:"#FCEAEA",
  amber:"#C2914F", amberLight:"#FAF1E2",
  blue:"#7E97A8", blueLight:"#EEF2F5",
  mauve:"#A6968A",
};

// ── CONSTANTS ────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const SERVICES = [
  { id:1, name:"Gel Manicure", duration:60, price:80 },
  { id:2, name:"Acrylic Full Set", duration:90, price:120 },
  { id:3, name:"Gel Pedicure", duration:75, price:90 },
  { id:4, name:"Nail Art (per nail)", duration:30, price:30 },
  { id:5, name:"Removal + Regrowth", duration:45, price:60 },
];

const EXPENSE_CATS = [
  {key:"rent",label:"Studio Rent",icon:"🏠"},
  {key:"supplies",label:"Nail Supplies",icon:"💅"},
  {key:"equip",label:"Equipment",icon:"⚙️"},
  {key:"insure",label:"Insurance",icon:"🛡️"},
  {key:"clean",label:"Cleaning",icon:"🧹"},
  {key:"market",label:"Marketing",icon:"📣"},
  {key:"account",label:"Accounting",icon:"📊"},
  {key:"other",label:"Other",icon:"📋"},
];

const CPA_TOPICS = [
  {id:"abn",label:"ABN Registration",icon:"📋"},
  {id:"gst",label:"GST Registration",icon:"📊"},
  {id:"payroll",label:"Payroll Setup",icon:"💵"},
  {id:"bookkeep",label:"Bookkeeping System Setup",icon:"📒"},
  {id:"bas",label:"BAS Lodgement",icon:"📅"},
  {id:"tax",label:"Income Tax Return",icon:"🧾"},
  {id:"other",label:"Other question",icon:"💬"},
];

// Hong Kong businesses don't have ABN/GST (those are Australian tax concepts) —
// shown instead of CPA_TOPICS for the /hk region (see `region` state in NailDesk).
const CPA_TOPICS_HK = [
  {id:"bookkeeping",label:"Bookkeeping",icon:"📒"},
  {id:"taxation",label:"Taxation",icon:"🧾"},
  {id:"taxreturn",label:"Tax Return",icon:"📄"},
  {id:"advice",label:"Business Advice",icon:"💼"},
  {id:"other",label:"Other question",icon:"💬"},
];

const IT_TOPICS = [
  {id:"bug",label:"Something isn't working",icon:"🐛"},
  {id:"missing",label:"Missing booking / data",icon:"❓"},
  {id:"howto",label:"How do I do something?",icon:"💡"},
  {id:"feature",label:"Request a new feature",icon:"✨"},
  {id:"change",label:"Custom change to my app",icon:"🎨"},
  {id:"other",label:"Other technical issue",icon:"⚙️"},
];

// ── TRANSLATIONS ─────────────────────────────────────────────────
const DAYS_CN = ["周日","周一","周二","周三","周四","周五","周六"];
const DAYS_TC = ["週日","週一","週二","週三","週四","週五","週六"];

// English display value stays the authoritative stored/matched value —
// these lookups only translate what's rendered, never what's stored in state.
const SERVICE_KEYS = {
  "Gel Manicure": "svcGelMani",
  "Acrylic Full Set": "svcAcrylicFull",
  "Gel Pedicure": "svcGelPedi",
  "Nail Art (per nail)": "svcNailArt",
  "Removal + Regrowth": "svcRemoval",
};
const METHOD_KEYS = { "Card":"methodCard", "Cash":"methodCash", "Bank transfer":"methodBank" };
const UNIT_KEYS = { "pcs":"unitPcs", "packs":"unitPacks", "bottles":"unitBottles", "boxes":"unitBoxes", "sets":"unitSets" };

const TR = {
  en: {
    nav_dashboard:"Home", nav_appointments:"Bookings", nav_clients:"Clients", nav_finances:"Finances",
    nav_prices:"Prices", nav_stock:"To-Do", nav_settings:"Booking", nav_support:"Support",
    sidebarTagline:"Studio",
    greetingMorning:"Good morning", greetingAfternoon:"Good afternoon", greetingEvening:"Good evening",
    statIncome:"Income", statExpenses:"Expenses", statNet:"Net",
    titleAppointments:"Appointments", titleClients:"Clients", titleFinances:"Income & Expenses",
    titlePriceList:"Price List", titleStock:"To-Do & Stock", titleSettings:"Booking Settings", titleSupport:"Get Help",
    stitleTodayAppts:"Today's Appointments", btnViewAll:"View all →", apptsEmptyToday:"No appointments today",
    onlineBookingActiveTitle:"🔗 Online Booking Active", onlineBookingActiveDesc:"Share your booking link — clients book themselves 24/7.",
    btnTryBooking:"Try booking page →",
    btnBookingLink:"🔗 Booking Link", btnManual:"+ Manual", apptsEmpty:"No appointments",
    btnCancelAppt:"Cancel appt", btnCall:"📞 Call",
    titleAddAppt:"+ Manual Appointment", lblClientName:"Client name", lblPhone:"Phone", lblTime:"Time",
    lblService:"Service", btnAddAppt:"Add Appointment",
    lblDuration:"Duration", lblPrice:"Price",
    btnAdd:"+ Add", placeholderSearchClients:"Search clients...", pillNote:"⚠ Note",
    pillOnline:"🔗 Online", pillManual:"✏️ Manual",
    lblEmail:"Email", lblDob:"Date of birth", lblClientSince:"Client since", labelNotesHeader:"⚠ NOTES",
    titleNewClient:"New Client", lblFullName:"Full Name", lblNotes:"Notes", btnAddClient:"Add Client",
    tabIncome:"Income", tabExpenses:"Expenses",
    titleRecordIncome:"Record Income", lblDate:"Date", lblClient:"Client", lblType:"Type", lblAmount:"Amount ($)",
    lblMethod:"Method", optionSelect:"Select", btnSave:"Save",
    titleRecordExpense:"Record Expense", lblCategory:"Category", lblDescription:"Description",
    methodCard:"Card", methodCash:"Cash", methodBank:"Bank transfer",
    btnPrint:"🖨 Print", priceMenuSubtitle:"Service Menu · Price List", priceBookOnline:"Book online — naildesk.shop",
    shareTitle:"📱 Share your price list", shareDesc:"Tap Print to save as PDF or send to a printer. Screenshot this card to post on Instagram.",
    stitleTodo:"✅ To-Do List", placeholderTodo:"e.g. Buy disposable wipes", stitleStock:"📦 Supply Stock",
    reorderPrefix:"Reorder at", lowStockWarning:"⚠ Low stock — reorder now",
    titleAddStock:"+ Add Stock Item", lblItemName:"Item name", placeholderItemName:"e.g. Gel top coat",
    lblQty:"Qty", placeholderZero:"0", lblReorderAt:"Reorder at", lblUnit:"Unit", btnAddItem:"Add Item",
    unitPcs:"pcs", unitPacks:"packs", unitBottles:"bottles", unitBoxes:"boxes", unitSets:"sets",
    stitleSlotLength:"⏱ Time Slot Length",
    stitleBlockedDates:"🚫 Blocked Dates", btnBlock:"+ Block",
    titleBlockDate:"Block a Date", lblReason:"Reason", btnBlockDate:"Block Date",
    stitleDeposit:"💰 Deposit & Bank Details", lblRequestDeposit:"Request a deposit",
    lblDepositAmount:"Deposit amount ($)", lblAccountName:"Account name", lblBsb:"BSB", lblAccountNo:"Account No.",
    lblCustomMessage:"Custom message", btnSaveSettings:"Save Settings",
    tabCpa:"📊 Business Support", tabIt:"🛠 IT Support",
    cpaInfoBanner:"💡 We can refer you to a registered professional for registration, bookkeeping, payroll, or tax support. Select what you need below.",
    cpaInfoBannerHk:"💡 We can refer you to a registered professional for bookkeeping, taxation, tax return, or business advice support. Select what you need below.",
    lblYourName:"Your name", lblYourEmail:"Your email", lblYourPhone:"Your phone",
    cpaQuestion:"What do you need help with?", lblAdditionalDetails:"Additional details (optional)", btnSendRequest:"Send Request →",
    itInfoBanner:"🛠 Found a bug or something not working? Let us know and we'll fix it.",
    itQuestion:"What's the issue?", lblDescribeIssue:"Describe the issue", lblUrgent:"This is urgent",
    btnSendIt:"Send to IT Support →",
    supportSentTitle:"Request sent!", supportSentDesc:"We'll get back to you within 1–2 business days.",
    btnSendAnother:"Send another request",
    expenseCat_rent:"Studio Rent", expenseCat_supplies:"Nail Supplies", expenseCat_equip:"Equipment",
    expenseCat_insure:"Insurance", expenseCat_clean:"Cleaning", expenseCat_market:"Marketing",
    expenseCat_account:"Accounting", expenseCat_other:"Other",
    cpaTopic_abn:"ABN Registration", cpaTopic_gst:"GST Registration", cpaTopic_payroll:"Payroll Setup",
    cpaTopic_bookkeep:"Bookkeeping System Setup", cpaTopic_bas:"BAS Lodgement", cpaTopic_tax:"Income Tax Return",
    cpaTopic_other:"Other question",
    cpaTopic_registration:"Registration", cpaTopic_bookkeeping:"Bookkeeping", cpaTopic_audit:"Audit",
    cpaTopic_taxation:"Taxation", cpaTopic_taxreturn:"Tax Return", cpaTopic_advice:"Business Advice",
    itTopic_bug:"Something isn't working", itTopic_missing:"Missing booking / data", itTopic_howto:"How do I do something?",
    itTopic_feature:"Request a new feature", itTopic_change:"Custom change to my app", itTopic_other:"Other technical issue",
    btnBack:"← Back", btnContinue:"Continue →", btnReview:"Review →", btnConfirmBooking:"Confirm booking ✓",
    btnBookAnother:"Book another appointment", btnBackToDashboard:"← Back to dashboard",
    bookStepPrefix:"Step", bookStepOf:"of 4",
    bookStepChoose:"Choose Service", bookStepPickDate:"Pick Date & Time", bookStepDetails:"Your Details",
    bookStepConfirm:"Confirm", bookStepDone:"Done",
    bookStep1Title:"Book an appointment", bookStep1Sub:"Select a service to see available times",
    bookTimezoneNote:"🕐 All times in Sydney time (AEDT)", bookSelectDate:"Select a date", bookFull:"Full",
    bookAvailableTimesPrefix:"Available times —", bookFullyBooked:"Fully booked — try another date",
    bookStep3Title:"Your details", bookDepositRequiredPrefix:"💰 Deposit required —",
    lblAccountInline:"Account:", lblBsbInline:"BSB:", lblNoInline:"No:",
    lblFullNameReq:"Full Name *", lblEmailReq:"Email *", lblPhoneReq:"Phone *", lblNotesOpt:"Notes (optional)",
    placeholderAllergies:"e.g. allergies",
    bookCancellationPolicy:"By booking you agree to our cancellation policy — please cancel at least 24 hours before your appointment.",
    bookStep4Title:"Confirm your booking", lblName:"Name",
    bookSuccessTitle:"You're booked!", bookSuccessSubtitle:"A confirmation has been sent to",
    lblReference:"Reference", lblDateTime:"Date & Time",
    bookSuccessNote1:"📧 Confirmation email sent", bookSuccessNote2:"⏰ Reminder will be sent 24hrs before",
    bookSuccessNote3:"📞 Need to cancel? Use your reference above",
    demoBannerBrand:"NailDesk Demo", demoBannerSampleData:"Sample data only.", demoBannerGetOwn:"Get your own →",
    footerText:"NailDesk Demo · naildesk.shop · Data resets on refresh",
    svcGelMani:"Gel Manicure", svcAcrylicFull:"Acrylic Full Set", svcGelPedi:"Gel Pedicure",
    svcNailArt:"Nail Art (per nail)", svcRemoval:"Removal + Regrowth",
  },
  cn: {
    nav_dashboard:"首页", nav_appointments:"预约", nav_clients:"客户", nav_finances:"财务",
    nav_prices:"价目表", nav_stock:"待办事项", nav_settings:"预约设置", nav_support:"客服支持",
    sidebarTagline:"工作室",
    greetingMorning:"早上好", greetingAfternoon:"下午好", greetingEvening:"晚上好",
    statIncome:"收入", statExpenses:"支出", statNet:"净收入",
    titleAppointments:"预约", titleClients:"客户", titleFinances:"收支管理",
    titlePriceList:"价目表", titleStock:"待办与库存", titleSettings:"预约设置", titleSupport:"获取帮助",
    stitleTodayAppts:"今日预约", btnViewAll:"查看全部 →", apptsEmptyToday:"今天没有预约",
    onlineBookingActiveTitle:"🔗 在线预约已启用", onlineBookingActiveDesc:"分享您的预约链接——客户可 24/7 自助预约。",
    btnTryBooking:"体验预约页面 →",
    btnBookingLink:"🔗 预约链接", btnManual:"+ 手动添加", apptsEmpty:"暂无预约",
    btnCancelAppt:"取消预约", btnCall:"📞 拨打电话",
    titleAddAppt:"+ 手动添加预约", lblClientName:"客户姓名", lblPhone:"电话", lblTime:"时间",
    lblService:"服务项目", btnAddAppt:"添加预约",
    lblDuration:"时长", lblPrice:"价格",
    btnAdd:"+ 添加", placeholderSearchClients:"搜索客户...", pillNote:"⚠ 备注",
    pillOnline:"🔗 在线", pillManual:"✏️ 手动",
    lblEmail:"邮箱", lblDob:"出生日期", lblClientSince:"建档日期", labelNotesHeader:"⚠ 备注",
    titleNewClient:"新增客户", lblFullName:"姓名", lblNotes:"备注", btnAddClient:"添加客户",
    tabIncome:"收入", tabExpenses:"支出",
    titleRecordIncome:"记录收入", lblDate:"日期", lblClient:"客户", lblType:"类型", lblAmount:"金额 ($)",
    lblMethod:"付款方式", optionSelect:"请选择", btnSave:"保存",
    titleRecordExpense:"记录支出", lblCategory:"类别", lblDescription:"描述",
    methodCard:"银行卡", methodCash:"现金", methodBank:"银行转账",
    btnPrint:"🖨 打印", priceMenuSubtitle:"服务项目 · 价目表", priceBookOnline:"在线预约 — naildesk.shop",
    shareTitle:"📱 分享您的价目表", shareDesc:"点击打印可保存为 PDF 或直接打印。截图此卡片即可发布到小红书。",
    stitleTodo:"✅ 待办事项", placeholderTodo:"例如：购买一次性湿巾", stitleStock:"📦 库存管理",
    reorderPrefix:"补货提醒：", lowStockWarning:"⚠ 库存不足 — 请及时补货",
    titleAddStock:"+ 添加库存项目", lblItemName:"项目名称", placeholderItemName:"例如：啫喱封层油",
    lblQty:"数量", placeholderZero:"0", lblReorderAt:"补货提醒数量", lblUnit:"单位", btnAddItem:"添加项目",
    unitPcs:"个", unitPacks:"包", unitBottles:"瓶", unitBoxes:"盒", unitSets:"套",
    stitleSlotLength:"⏱ 预约时段长度",
    stitleBlockedDates:"🚫 休息日期", btnBlock:"+ 添加休息日",
    titleBlockDate:"设置休息日期", lblReason:"原因", btnBlockDate:"确认休息",
    stitleDeposit:"💰 定金与银行信息", lblRequestDeposit:"需要收取定金",
    lblDepositAmount:"定金金额 ($)", lblAccountName:"账户名称", lblBsb:"BSB 银行代码", lblAccountNo:"账户号码",
    lblCustomMessage:"自定义提示信息", btnSaveSettings:"保存设置",
    tabCpa:"📊 商业支持", tabIt:"🛠 技术支持",
    cpaInfoBanner:"💡 我们可以为您推荐持牌专业人士，协助注册、记账、发薪或报税事宜。请在下方选择您需要的服务。",
    cpaInfoBannerHk:"💡 我们可以为您转介持牌专业人士，协助记账、税务、报税或商业咨询事宜。请在下方选择您需要的服务。",
    lblYourName:"您的姓名", lblYourEmail:"您的邮箱", lblYourPhone:"您的电话",
    cpaQuestion:"您需要哪方面的帮助？", lblAdditionalDetails:"补充说明（选填）", btnSendRequest:"提交请求 →",
    itInfoBanner:"🛠 发现程序错误或功能异常？告诉我们，我们会尽快修复。",
    itQuestion:"遇到了什么问题？", lblDescribeIssue:"请描述问题", lblUrgent:"这是紧急问题",
    btnSendIt:"发送给技术支持 →",
    supportSentTitle:"请求已发送！", supportSentDesc:"我们将在 1-2 个工作日内回复您。",
    btnSendAnother:"发送新的请求",
    expenseCat_rent:"店铺租金", expenseCat_supplies:"美甲耗材", expenseCat_equip:"设备",
    expenseCat_insure:"保险", expenseCat_clean:"清洁用品", expenseCat_market:"市场推广",
    expenseCat_account:"会计服务", expenseCat_other:"其他",
    cpaTopic_abn:"ABN 注册", cpaTopic_gst:"GST 注册", cpaTopic_payroll:"薪资系统设置",
    cpaTopic_bookkeep:"记账系统设置", cpaTopic_bas:"BAS 申报", cpaTopic_tax:"个人所得税申报",
    cpaTopic_other:"其他问题",
    cpaTopic_registration:"注册", cpaTopic_bookkeeping:"记账服务", cpaTopic_audit:"审计",
    cpaTopic_taxation:"税务", cpaTopic_taxreturn:"报税", cpaTopic_advice:"商业咨询",
    itTopic_bug:"程序无法正常使用", itTopic_missing:"预约或数据丢失", itTopic_howto:"如何操作某个功能？",
    itTopic_feature:"申请新功能", itTopic_change:"定制我的应用", itTopic_other:"其他技术问题",
    btnBack:"← 返回", btnContinue:"继续 →", btnReview:"确认信息 →", btnConfirmBooking:"确认预约 ✓",
    btnBookAnother:"再预约一次", btnBackToDashboard:"← 返回首页",
    bookStepPrefix:"第", bookStepOf:"步 / 共 4 步",
    bookStepChoose:"选择服务", bookStepPickDate:"选择日期与时间", bookStepDetails:"填写信息",
    bookStepConfirm:"确认预约", bookStepDone:"完成",
    bookStep1Title:"预约服务", bookStep1Sub:"选择服务项目以查看可预约时间",
    bookTimezoneNote:"🕐 所有时间均为悉尼时间 (AEDT)", bookSelectDate:"选择日期", bookFull:"已满",
    bookAvailableTimesPrefix:"可预约时间 —", bookFullyBooked:"当天已约满 — 请选择其他日期",
    bookStep3Title:"填写您的信息", bookDepositRequiredPrefix:"💰 需支付定金 —",
    lblAccountInline:"账户：", lblBsbInline:"BSB：", lblNoInline:"账号：",
    lblFullNameReq:"姓名 *", lblEmailReq:"邮箱 *", lblPhoneReq:"电话 *", lblNotesOpt:"备注（选填）",
    placeholderAllergies:"例如：过敏史",
    bookCancellationPolicy:"预约即表示您同意我们的取消政策——请至少提前 24 小时取消预约。",
    bookStep4Title:"确认您的预约", lblName:"姓名",
    bookSuccessTitle:"预约成功！", bookSuccessSubtitle:"确认邮件已发送至",
    lblReference:"预约编号", lblDateTime:"日期与时间",
    bookSuccessNote1:"📧 确认邮件已发送", bookSuccessNote2:"⏰ 我们将在预约前 24 小时发送提醒",
    bookSuccessNote3:"📞 需要取消？请使用上方预约编号",
    demoBannerBrand:"NailDesk 演示", demoBannerSampleData:"仅为示例数据。", demoBannerGetOwn:"获取您自己的 →",
    footerText:"NailDesk 演示 · naildesk.shop · 刷新页面将重置数据",
    svcGelMani:"啫喱美甲", svcAcrylicFull:"水晶甲全套", svcGelPedi:"啫喱美足",
    svcNailArt:"甲片彩绘（单指）", svcRemoval:"卸甲 + 补甲",
  },
  tc: {
    nav_dashboard:"首頁", nav_appointments:"預約", nav_clients:"客戶", nav_finances:"財務",
    nav_prices:"價目表", nav_stock:"待辦事項", nav_settings:"預約設定", nav_support:"客服支援",
    sidebarTagline:"工作室",
    greetingMorning:"早安", greetingAfternoon:"午安", greetingEvening:"晚安",
    statIncome:"收入", statExpenses:"支出", statNet:"淨收入",
    titleAppointments:"預約", titleClients:"客戶", titleFinances:"收支管理",
    titlePriceList:"價目表", titleStock:"待辦與庫存", titleSettings:"預約設定", titleSupport:"取得協助",
    stitleTodayAppts:"今日預約", btnViewAll:"查看全部 →", apptsEmptyToday:"今天沒有預約",
    onlineBookingActiveTitle:"🔗 線上預約已啟用", onlineBookingActiveDesc:"分享您的預約連結——客戶可 24/7 自行預約。",
    btnTryBooking:"體驗預約頁面 →",
    btnBookingLink:"🔗 預約連結", btnManual:"+ 手動新增", apptsEmpty:"暫無預約",
    btnCancelAppt:"取消預約", btnCall:"📞 撥打電話",
    titleAddAppt:"+ 手動新增預約", lblClientName:"客戶姓名", lblPhone:"電話", lblTime:"時間",
    lblService:"服務項目", btnAddAppt:"新增預約",
    lblDuration:"時長", lblPrice:"價格",
    btnAdd:"+ 新增", placeholderSearchClients:"搜尋客戶...", pillNote:"⚠ 備註",
    pillOnline:"🔗 線上", pillManual:"✏️ 手動",
    lblEmail:"電郵", lblDob:"出生日期", lblClientSince:"建檔日期", labelNotesHeader:"⚠ 備註",
    titleNewClient:"新增客戶", lblFullName:"姓名", lblNotes:"備註", btnAddClient:"新增客戶",
    tabIncome:"收入", tabExpenses:"支出",
    titleRecordIncome:"記錄收入", lblDate:"日期", lblClient:"客戶", lblType:"類型", lblAmount:"金額 ($)",
    lblMethod:"付款方式", optionSelect:"請選擇", btnSave:"儲存",
    titleRecordExpense:"記錄支出", lblCategory:"類別", lblDescription:"描述",
    methodCard:"信用卡", methodCash:"現金", methodBank:"銀行轉帳",
    btnPrint:"🖨 列印", priceMenuSubtitle:"服務項目 · 價目表", priceBookOnline:"線上預約 — naildesk.shop",
    shareTitle:"📱 分享您的價目表", shareDesc:"點選列印可儲存為 PDF 或直接列印。截圖此卡片即可分享至社群。",
    stitleTodo:"✅ 待辦事項", placeholderTodo:"例如：購買拋棄式濕紙巾", stitleStock:"📦 庫存管理",
    reorderPrefix:"補貨提醒：", lowStockWarning:"⚠ 庫存不足 — 請盡快補貨",
    titleAddStock:"+ 新增庫存項目", lblItemName:"項目名稱", placeholderItemName:"例如：光療封層油",
    lblQty:"數量", placeholderZero:"0", lblReorderAt:"補貨提醒數量", lblUnit:"單位", btnAddItem:"新增項目",
    unitPcs:"個", unitPacks:"包", unitBottles:"瓶", unitBoxes:"盒", unitSets:"套",
    stitleSlotLength:"⏱ 預約時段長度",
    stitleBlockedDates:"🚫 休息日期", btnBlock:"+ 新增休息日",
    titleBlockDate:"設定休息日期", lblReason:"原因", btnBlockDate:"確認休息",
    stitleDeposit:"💰 訂金與銀行資訊", lblRequestDeposit:"需要收取訂金",
    lblDepositAmount:"訂金金額 ($)", lblAccountName:"帳戶名稱", lblBsb:"BSB 銀行代碼", lblAccountNo:"帳戶號碼",
    lblCustomMessage:"自訂提示訊息", btnSaveSettings:"儲存設定",
    tabCpa:"📊 商業支援", tabIt:"🛠 技術支援",
    cpaInfoBanner:"💡 我們可以為您轉介持牌專業人士，協助註冊、記帳、發薪或報稅事宜。請在下方選擇您需要的服務。",
    cpaInfoBannerHk:"💡 我們可以為您轉介持牌專業人士，協助記帳、稅務、報稅或商業諮詢事宜。請在下方選擇您需要的服務。",
    lblYourName:"您的姓名", lblYourEmail:"您的電郵", lblYourPhone:"您的電話",
    cpaQuestion:"您需要哪方面的協助？", lblAdditionalDetails:"補充說明（選填）", btnSendRequest:"送出請求 →",
    itInfoBanner:"🛠 發現程式錯誤或功能異常？告訴我們，我們會盡快修復。",
    itQuestion:"遇到了什麼問題？", lblDescribeIssue:"請描述問題", lblUrgent:"這是緊急問題",
    btnSendIt:"送出給技術支援 →",
    supportSentTitle:"請求已送出！", supportSentDesc:"我們將在 1-2 個工作天內回覆您。",
    btnSendAnother:"送出新的請求",
    expenseCat_rent:"店鋪租金", expenseCat_supplies:"美甲耗材", expenseCat_equip:"設備",
    expenseCat_insure:"保險", expenseCat_clean:"清潔用品", expenseCat_market:"行銷推廣",
    expenseCat_account:"會計服務", expenseCat_other:"其他",
    cpaTopic_abn:"ABN 註冊", cpaTopic_gst:"GST 註冊", cpaTopic_payroll:"薪資系統設定",
    cpaTopic_bookkeep:"記帳系統設定", cpaTopic_bas:"BAS 申報", cpaTopic_tax:"個人所得稅申報",
    cpaTopic_other:"其他問題",
    cpaTopic_registration:"註冊", cpaTopic_bookkeeping:"記帳服務", cpaTopic_audit:"審計",
    cpaTopic_taxation:"稅務", cpaTopic_taxreturn:"報稅", cpaTopic_advice:"商業諮詢",
    itTopic_bug:"程式無法正常使用", itTopic_missing:"預約或資料遺失", itTopic_howto:"如何操作某個功能？",
    itTopic_feature:"申請新功能", itTopic_change:"客製化我的應用程式", itTopic_other:"其他技術問題",
    btnBack:"← 返回", btnContinue:"繼續 →", btnReview:"確認資訊 →", btnConfirmBooking:"確認預約 ✓",
    btnBookAnother:"再預約一次", btnBackToDashboard:"← 返回首頁",
    bookStepPrefix:"第", bookStepOf:"步 / 共 4 步",
    bookStepChoose:"選擇服務", bookStepPickDate:"選擇日期與時間", bookStepDetails:"填寫資訊",
    bookStepConfirm:"確認預約", bookStepDone:"完成",
    bookStep1Title:"預約服務", bookStep1Sub:"選擇服務項目以查看可預約時間",
    bookTimezoneNote:"🕐 所有時間均為雪梨時間 (AEDT)", bookSelectDate:"選擇日期", bookFull:"已滿",
    bookAvailableTimesPrefix:"可預約時間 —", bookFullyBooked:"當天已預約額滿 — 請選擇其他日期",
    bookStep3Title:"填寫您的資訊", bookDepositRequiredPrefix:"💰 需支付訂金 —",
    lblAccountInline:"帳戶：", lblBsbInline:"BSB：", lblNoInline:"帳號：",
    lblFullNameReq:"姓名 *", lblEmailReq:"電郵 *", lblPhoneReq:"電話 *", lblNotesOpt:"備註（選填）",
    placeholderAllergies:"例如：過敏史",
    bookCancellationPolicy:"預約即表示您同意我們的取消政策——請至少提前 24 小時取消預約。",
    bookStep4Title:"確認您的預約", lblName:"姓名",
    bookSuccessTitle:"預約成功！", bookSuccessSubtitle:"確認郵件已寄送至",
    lblReference:"預約編號", lblDateTime:"日期與時間",
    bookSuccessNote1:"📧 確認郵件已寄送", bookSuccessNote2:"⏰ 我們將在預約前 24 小時發送提醒",
    bookSuccessNote3:"📞 需要取消？請使用上方預約編號",
    demoBannerBrand:"NailDesk 展示", demoBannerSampleData:"僅為範例資料。", demoBannerGetOwn:"取得您自己的 →",
    footerText:"NailDesk 展示 · naildesk.shop · 重新整理頁面將重設資料",
    svcGelMani:"光療美甲", svcAcrylicFull:"水晶指甲全套", svcGelPedi:"光療美足",
    svcNailArt:"指甲彩繪（單指）", svcRemoval:"卸甲 + 補甲",
  },
};

const serviceLabel = (name, lang) => { const k=SERVICE_KEYS[name]; if(!k) return name; return (TR[lang]&&TR[lang][k])||TR.en[k]||name; };
const methodLabel = (m, lang) => { const k=METHOD_KEYS[m]; if(!k) return m; return (TR[lang]&&TR[lang][k])||TR.en[k]||m; };
const unitLabel = (u, lang) => { const k=UNIT_KEYS[u]; if(!k) return u; return (TR[lang]&&TR[lang][k])||TR.en[k]||u; };

// ── INITIAL DATA ─────────────────────────────────────────────────
const INIT_CLIENTS = [
  {id:1,name:"Sarah Chen",phone:"0412 345 678",email:"sarah@email.com",dob:"1988-03-15",joined:"2025-01-10",notes:"Prefers almond shape, allergic to certain gel brands."},
  {id:2,name:"Emma Williams",phone:"0423 456 789",email:"emma@email.com",dob:"1995-07-22",joined:"2025-02-01",notes:"Regular every 3 weeks."},
  {id:3,name:"Mei Lin",phone:"0445 678 901",email:"mei@email.com",dob:"2000-04-18",joined:"2025-04-20",notes:""},
  {id:4,name:"Lisa Park",phone:"0434 567 890",email:"lisa@email.com",dob:"1990-11-05",joined:"2025-03-15",notes:"Sensitive cuticles."},
];

const INIT_APPTS = [
  {id:1,date:"2026-07-01",time:"09:00",duration:60,service:"Gel Manicure",price:80,client:"Sarah Chen",phone:"0412 345 678",source:"online"},
  {id:2,date:"2026-07-01",time:"11:00",duration:90,service:"Acrylic Full Set",price:120,client:"Emma Williams",phone:"0423 456 789",source:"online"},
  {id:3,date:"2026-07-01",time:"14:00",duration:60,service:"Gel Manicure",price:80,client:"Mei Lin",phone:"0445 678 901",source:"manual"},
  {id:4,date:"2026-07-02",time:"10:00",duration:75,service:"Gel Pedicure",price:90,client:"Lisa Park",phone:"0434 567 890",source:"online"},
  {id:5,date:"2026-07-03",time:"13:00",duration:45,service:"Removal + Regrowth",price:60,client:"Anna Wu",phone:"0456 789 012",source:"manual"},
];

const INIT_INCOME = [
  {id:1,date:"2026-06-02",client:"Sarah Chen",type:"Gel Manicure",amount:80,method:"Card"},
  {id:2,date:"2026-06-03",client:"Emma Williams",type:"Acrylic Full Set",amount:120,method:"Bank transfer"},
  {id:3,date:"2026-06-05",client:"Lisa Park",type:"Gel Pedicure",amount:90,method:"Card"},
  {id:4,date:"2026-06-07",client:"Mei Lin",type:"Gel Manicure",amount:80,method:"Cash"},
  {id:5,date:"2026-06-10",client:"Sarah Chen",type:"Nail Art",amount:60,method:"Card"},
  {id:6,date:"2026-06-12",client:"Anna Wu",type:"Acrylic Full Set",amount:120,method:"Card"},
  {id:7,date:"2026-06-14",client:"Emma Williams",type:"Gel Manicure",amount:80,method:"Card"},
  {id:8,date:"2026-06-17",client:"Lisa Park",type:"Removal + Regrowth",amount:60,method:"Card"},
  {id:9,date:"2026-06-19",client:"Mei Lin",type:"Gel Pedicure",amount:90,method:"Cash"},
  {id:10,date:"2026-06-21",client:"Sarah Chen",type:"Acrylic Full Set",amount:120,method:"Card"},
  {id:11,date:"2026-06-24",client:"Anna Wu",type:"Gel Manicure",amount:80,method:"Bank transfer"},
  {id:12,date:"2026-06-26",client:"Emma Williams",type:"Gel Pedicure",amount:90,method:"Card"},
];

const INIT_EXPENSES = [
  {id:1,date:"2026-06-01",category:"rent",description:"Studio rent — June",amount:800,receipt:true},
  {id:2,date:"2026-06-05",category:"supplies",description:"Gel polish restock",amount:120,receipt:true},
  {id:3,date:"2026-06-10",category:"clean",description:"Cleaning supplies",amount:35,receipt:true},
];

const INIT_PRICES = SERVICES.map(s=>({...s,active:true}));

const INIT_STOCK = [
  {id:1,name:"Disposable wipes",qty:8,reorder:5,unit:"packs"},
  {id:2,name:"Cotton pads",qty:12,reorder:8,unit:"packs"},
  {id:3,name:"Gel top coat",qty:2,reorder:2,unit:"bottles"},
  {id:4,name:"Nail polish remover",qty:3,reorder:2,unit:"bottles"},
  {id:5,name:"Disposable files",qty:20,reorder:10,unit:"pcs"},
];

const INIT_TODOS = [
  {id:1,text:"Buy disposable wipes",done:false},
  {id:2,text:"Restock gel polish — pink shades",done:false},
  {id:3,text:"Clean and sanitise tools",done:false},
];

// ── HELPERS ───────────────────────────────────────────────────────
const fmtDate = d => { if(!d) return "—"; const dt=new Date(d); return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`; };
const fmt12 = t => { const [h,m]=t.split(":").map(Number); const mm=String(m).padStart(2,"0"); return h===12?`12:${mm}pm`:h>12?`${h-12}:${mm}pm`:`${h}:${mm}am`; };
const todayStr = () => new Date().toISOString().split("T")[0];

// ── LOCALIZED DATE/TIME DISPLAY HELPERS ────────────────────────────
// These only change the RENDERED text — the underlying date strings
// (e.g. "2026-07-01") stored in state are never touched.
const fmtDateLoc = (d, lang) => {
  if(!d) return "—";
  if(lang==="en") return fmtDate(d);
  const dt = new Date(d);
  return `${dt.getFullYear()}年${dt.getMonth()+1}月${dt.getDate()}日`;
};
const weekdayShort = (dateObj, lang) => lang==="en" ? DAYS[dateObj.getDay()] : (lang==="tc"?DAYS_TC:DAYS_CN)[dateObj.getDay()];
const monthDayText = (dateObj, lang) => lang==="en"
  ? `${DAYS[dateObj.getDay()]} ${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}`
  : `${weekdayShort(dateObj,lang)} ${dateObj.getMonth()+1}月${dateObj.getDate()}日`;
const monthOnly = (dateObj, lang) => lang==="en" ? MONTHS[dateObj.getMonth()] : `${dateObj.getMonth()+1}月`;
const fmt12Loc = (time, lang) => {
  if(lang==="en") return fmt12(time);
  const [h,m] = time.split(":").map(Number);
  const mm = String(m).padStart(2,"0");
  const period = h<12 ? "上午" : "下午";
  const hh = h===0?12:h>12?h-12:h;
  return `${period}${hh}:${mm}`;
};
const durText = (mins, lang) => lang==="en" ? `${mins} min` : lang==="tc" ? `${mins} 分鐘` : `${mins} 分钟`;
const apptCountText = (n, lang) => lang==="en" ? `${n} appointment${n!==1?"s":""}` : lang==="tc" ? `${n} 個預約` : `${n} 个预约`;
const slotLabel = (v, lang) => {
  if(lang==="en") return v<60?`${v}m`:v===60?"1hr":"1h30";
  if(v<60) return `${v}分`;
  if(v===60) return lang==="tc"?"1小時":"1小时";
  return lang==="tc"?"1.5小時":"1.5小时";
};

// ── NAV CONFIG ────────────────────────────────────────────────────
// Labels are translated at render time in AppSidebar via TR[lang][`nav_${id}`].
const NAV = [
  {id:"dashboard"},
  {id:"appointments"},
  {id:"clients"},
  {id:"finances"},
  {id:"prices"},
  {id:"stock"},
  {id:"settings"},
  {id:"support"},
];

// ── SIDEBAR (top-level component) ─────────────────────────────────
function AppSidebar({screen, setScreen, lang}) {
  const icons = {
    dashboard: "⊞", appointments: "📅", clients: "👤",
    finances: "💰", prices: "🏷", stock: "✅",
    settings: "⚙️", support: "❓",
  };
  const navLabel = (id) => (TR[lang]&&TR[lang][`nav_${id}`]) || TR.en[`nav_${id}`] || id;
  return (
    <div style={{width:68,flexShrink:0,background:C.sidebar,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:16,gap:2,position:"sticky",top:0,borderRight:`1px solid ${C.border}`}}>
      <div style={{marginBottom:14,textAlign:"center",padding:"0 6px"}}>
        <div style={{fontFamily:"'Dancing Script',cursive",fontSize:20,fontWeight:700,color:C.text,lineHeight:1}}>Bloom</div>
        <div style={{fontSize:7,color:C.text,opacity:0.5,marginTop:3,letterSpacing:"0.12em",textTransform:"uppercase"}}>{(TR[lang]&&TR[lang].sidebarTagline)||TR.en.sidebarTagline}</div>
      </div>
      <div style={{width:36,height:1,background:C.border,marginBottom:8}}/>
      {NAV.map(item=>{
        const active=screen===item.id;
        return (
          <div key={item.id} onClick={()=>setScreen(item.id)}
            style={{width:58,padding:"8px 4px 6px",borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",marginBottom:2,
              background:active?"rgba(255,255,255,0.5)":"transparent",
              borderLeft:active?`2px solid ${C.pinkDark}`:"2px solid transparent"}}>
            <div style={{fontSize:16,opacity:active?1:0.5}}>{icons[item.id]}</div>
            <div style={{fontSize:7.5,marginTop:3,fontWeight:active?700:400,color:active?C.pinkDark:C.text,opacity:active?1:0.6}}>{navLabel(item.id)}</div>
          </div>
        );
      })}
    </div>
  );
}

// Which display languages each marketing-page entry point offers, and the
// language it should start in. naildesk.shop and naildesk.shop/cn are both
// AU-region — root links to an English-only demo, /cn adds Simplified Chinese.
// naildesk.shop/hk is the Hong Kong market and offers all three, defaulting
// to Traditional Chinese. Selected via ?region=cn / ?region=hk on the demo link.
const REGION_LANGS = { au: ["en"], cn: ["en","cn"], hk: ["en","cn","tc"] };
const REGION_DEFAULT_LANG = { au: "en", cn: "cn", hk: "tc" };

// ── MAIN APP ──────────────────────────────────────────────────────
export default function NailDesk() {
  const studioName = "Bloom Nails";
  const [screen, setScreen] = useState("dashboard");
  const region = (() => {
    if (typeof window === "undefined") return "au";
    const p = new URLSearchParams(window.location.search).get("region");
    return (p === "cn" || p === "hk") ? p : "au";
  })();
  const allowedLangs = REGION_LANGS[region] || ["en"];
  const [lang, setLang] = useState(REGION_DEFAULT_LANG[region] || "en");
  const tr = (key) => (TR[lang] && TR[lang][key]) || TR.en[key] || key;
  const cycleLang = () => setLang(l => {
    const idx = allowedLangs.indexOf(l);
    return allowedLangs[(idx+1) % allowedLangs.length];
  });
  const langChip = {en:"EN", cn:"简", tc:"繁"};

  // Data state
  const [clients, setClients] = useState(INIT_CLIENTS);
  const [appts, setAppts] = useState(INIT_APPTS);
  const [income, setIncome] = useState(INIT_INCOME);
  const [expenses, setExpenses] = useState(INIT_EXPENSES);
  const [prices, setPrices] = useState(INIT_PRICES);
  const [stock, setStock] = useState(INIT_STOCK);
  const [todos, setTodos] = useState(INIT_TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStock, setNewStock] = useState({name:"",qty:"",reorder:"",unit:"pcs"});

  // Appointments state
  const [selDate, setSelDate] = useState("2026-07-01");
  const [selAppt, setSelAppt] = useState(null);
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newAppt, setNewAppt] = useState({time:"09:00",service:"Gel Manicure",client:"",phone:""});

  // Client state
  const [selClient, setSelClient] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({name:"",phone:"",email:"",dob:"",notes:""});
  const [clientSearch, setClientSearch] = useState("");

  // Finance state
  const [finTab, setFinTab] = useState("income");
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newIncome, setNewIncome] = useState({date:"",client:"",type:"",amount:"",method:"Card"});
  const [newExpense, setNewExpense] = useState({date:"",category:"rent",description:"",amount:""});

  // Booking settings
  const [slotLength, setSlotLength] = useState(60);
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState("20");
  const [bankDetails, setBankDetails] = useState({accountName:"Bloom Nails Pty Ltd",bsb:"062-000",accountNumber:"1234 5678"});
  const [customMessage, setCustomMessage] = useState("Please transfer your deposit within 24 hours to secure your booking.");
  const [blockedDates, setBlockedDates] = useState([{id:1,date:"2026-07-25",reason:"Studio closed"}]);
  const [showAddBlocked, setShowAddBlocked] = useState(false);
  const [newBlocked, setNewBlocked] = useState({date:"",reason:""});

  // Booking flow state
  const [bkStep, setBkStep] = useState(1);
  const [bkService, setBkService] = useState(null);
  const [bkDate, setBkDate] = useState(null);
  const [bkSlot, setBkSlot] = useState(null);
  const [bkForm, setBkForm] = useState({name:"",email:"",phone:"",note:""});
  const [bkRef] = useState("BK"+Math.random().toString(36).substr(2,6).toUpperCase());

  // Support state
  const [supportTab, setSupportTab] = useState("cpa");
  const [cpaTopics, setCpaTopics] = useState([]);
  const [cpaMessage, setCpaMessage] = useState("");
  const [itTopic, setItTopic] = useState(null);
  const [itMessage, setItMessage] = useState("");
  const [itUrgent, setItUrgent] = useState(false);
  // Support contact state
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [supportSent, setSupportSent] = useState(null);

  // Computed
  const totalIn = income.reduce((s,i)=>s+i.amount,0);
  const totalOut = expenses.reduce((s,e)=>s+e.amount,0);
  const hour = new Date().getHours();
  const greeting = hour<12?tr("greetingMorning"):hour<17?tr("greetingAfternoon"):tr("greetingEvening");

  // ── SHARED STYLES ─────────────────────────────────────────────────
  const overlay={position:"fixed",inset:0,background:"rgba(42,24,32,0.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"};
  const sheet={background:C.card,borderRadius:"18px 18px 0 0",padding:"22px 18px 32px",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto"};
  const inp={width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,background:C.bg,outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text};
  const btn={background:C.pinkDark,color:"#fff",border:"none",borderRadius:10,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"};
  const btnSm={background:C.pinkDark,color:"#fff",border:"none",borderRadius:8,padding:"6px 13px",fontSize:11,fontWeight:600,cursor:"pointer"};
  const btnGhost={background:"transparent",color:C.pinkDark,border:`1.5px solid ${C.pinkDark}`,borderRadius:10,padding:"11px 20px",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"};
  const card={background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:10,boxShadow:"0 1px 4px rgba(42,33,24,0.07)"};
  const row={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`};
  const lbl={fontSize:11,color:C.sub,marginBottom:4,display:"block",fontWeight:500};
  const stitle={fontSize:10,fontWeight:700,color:C.mute,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10};
  const pill=(bg,col)=>({background:bg,color:col,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,display:"inline-block"});
  const chk=(done)=>({width:18,height:18,borderRadius:5,border:`2px solid ${done?C.pinkDark:C.border}`,background:done?C.pinkDark:C.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0});

  const TopBar=({title,action})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
      <div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:400,fontStyle:"italic",color:C.text}}>{title}</div>
        {screen==="dashboard"&&<div style={{fontSize:10,color:C.sub,marginTop:1,letterSpacing:"0.08em",textTransform:"uppercase"}}>{studioName}</div>}
      </div>
      {action}
    </div>
  );

  // ── WEEK NAVIGATION ───────────────────────────────────────────────
  const getWeekDates = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - (day===0?6:day-1));
    return Array.from({length:7},(_,i)=>{
      const dd=new Date(monday);
      dd.setDate(monday.getDate()+i);
      return dd.toISOString().split("T")[0];
    });
  };

  const shiftWeek = (dir) => {
    const d = new Date(selDate);
    d.setDate(d.getDate()+dir*7);
    setSelDate(d.toISOString().split("T")[0]);
  };

  // ── BOOKING SLOTS ─────────────────────────────────────────────────
  const BLOCKED_SLOTS = {"2026-07-01":["09:00","11:00","14:00"],"2026-07-02":["10:00","13:00"],"2026-07-03":["09:00","10:00","11:00","14:00","15:00","16:00","17:00"]};
  const getSlots = (dateStr, dur) => {
    if (blockedDates.find(b=>b.date===dateStr)) return [];
    const booked = BLOCKED_SLOTS[dateStr]||[];
    const slots=[];
    for(let h=9;h<=18-Math.ceil(dur/slotLength);h++){
      const t=`${String(h).padStart(2,"0")}:00`;
      if(!booked.includes(t)) slots.push(t);
    }
    return slots;
  };

  const getBkDates = () => {
    const dates=[];
    const today=new Date();
    for(let i=1;i<=14;i++){
      const d=new Date(today);
      d.setDate(today.getDate()+i);
      if(d.getDay()!==0) dates.push(d);
    }
    return dates;
  };

  // ─────────────────────────────────────────────────────────────────
  // SCREENS
  // ─────────────────────────────────────────────────────────────────

  // ── DASHBOARD ─────────────────────────────────────────────────────
  const renderDashboard = () => {
    const todayAppts = appts.filter(a=>a.date===todayStr()).sort((a,b)=>a.time.localeCompare(b.time));
    return (
      <div>
        <TopBar title={greeting}/>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          {[{k:"statIncome",v:`$${totalIn.toLocaleString()}`,c:C.green},{k:"statExpenses",v:`$${totalOut.toLocaleString()}`,c:C.amber},{k:"statNet",v:`$${(totalIn-totalOut).toLocaleString()}`,c:(totalIn-totalOut)>=0?C.green:C.red}].map(s=>(
            <div key={s.k} style={{...card,flex:1,marginBottom:0,textAlign:"center",padding:"12px 8px"}}>
              <div style={{fontSize:17,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:C.mute,marginTop:3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{tr(s.k)}</div>
            </div>
          ))}
        </div>
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={stitle}>{tr("stitleTodayAppts")}</div>
            <button onClick={()=>setScreen("appointments")} style={{...btnSm,background:"transparent",color:C.pinkDark,border:`1px solid ${C.pinkLight}`}}>{tr("btnViewAll")}</button>
          </div>
          {todayAppts.length===0?<div style={{color:C.mute,fontSize:13}}>{tr("apptsEmptyToday")}</div>:todayAppts.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>{setSelAppt(a);setScreen("appointments")}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text,width:60}}>{fmt12Loc(a.time,lang)}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{a.client}</div><div style={{fontSize:11,color:C.sub}}>{serviceLabel(a.service,lang)}</div></div>
              <div style={{fontSize:13,fontWeight:700,color:C.pinkDark}}>${a.price}</div>
            </div>
          ))}
        </div>
        <div style={{...card,background:C.greenLight,border:`1px solid ${C.green}30`}}>
          <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:6}}>{tr("onlineBookingActiveTitle")}</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:10}}>{tr("onlineBookingActiveDesc")}</div>
          <button onClick={()=>setScreen("booking")} style={btnSm}>{tr("btnTryBooking")}</button>
        </div>
      </div>
    );
  };

  // ── APPOINTMENTS ──────────────────────────────────────────────────
  const renderAppointments = () => {
    const weekDates = getWeekDates(selDate);
    const dayAppts = appts.filter(a=>a.date===selDate).sort((a,b)=>a.time.localeCompare(b.time));
    const dateObj = new Date(selDate);
    const dateDisplay = monthDayText(dateObj,lang);
    return (
      <div>
        <TopBar title={tr("titleAppointments")} action={<button onClick={()=>setScreen("booking")} style={btnSm}>{tr("btnBookingLink")}</button>}/>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:14}}>
          <button onClick={()=>shiftWeek(-1)} style={{background:C.pinkLight,border:"none",borderRadius:8,width:28,height:28,fontSize:14,color:C.pinkDark,cursor:"pointer",flexShrink:0}}>‹</button>
          <div style={{display:"flex",gap:4,flex:1,overflowX:"auto"}}>
            {weekDates.map(d=>{
              const dt=new Date(d);
              const count=appts.filter(a=>a.date===d).length;
              const sel=d===selDate;
              const isToday=d===todayStr();
              return (
                <div key={d} onClick={()=>setSelDate(d)} style={{flex:1,minWidth:40,borderRadius:11,padding:"7px 3px",textAlign:"center",cursor:"pointer",background:sel?C.pinkDark:C.card,border:`1.5px solid ${sel?C.pinkDark:isToday?C.pink:C.border}`}}>
                  <div style={{fontSize:8,fontWeight:700,color:sel?"rgba(255,255,255,0.7)":C.sub}}>{weekdayShort(dt,lang)}</div>
                  <div style={{fontSize:15,fontWeight:700,color:sel?"#fff":C.text,margin:"2px 0"}}>{dt.getDate()}</div>
                  {count>0&&<div style={{fontSize:7,color:sel?"rgba(255,255,255,0.7)":C.pink,fontWeight:600}}>{count}</div>}
                </div>
              );
            })}
          </div>
          <button onClick={()=>shiftWeek(1)} style={{background:C.pinkLight,border:"none",borderRadius:8,width:28,height:28,fontSize:14,color:C.pinkDark,cursor:"pointer",flexShrink:0}}>›</button>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text}}>{dateDisplay} · {apptCountText(dayAppts.length,lang)}</div>
          <button onClick={()=>setShowAddAppt(true)} style={btnSm}>{tr("btnManual")}</button>
        </div>
        {dayAppts.length===0?<div style={{...card,textAlign:"center",padding:28}}><div style={{fontSize:28,marginBottom:8}}>📅</div><div style={{color:C.sub,fontSize:13}}>{tr("apptsEmpty")}</div></div>:
          dayAppts.map(a=>(
            <div key={a.id} onClick={()=>setSelAppt(a)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${a.source==="online"?C.green:C.pink}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:12}}>
                  <div style={{textAlign:"center",flexShrink:0}}><div style={{fontSize:13,fontWeight:700}}>{fmt12Loc(a.time,lang)}</div><div style={{fontSize:9,color:C.mute}}>{durText(a.duration,lang)}</div></div>
                  <div><div style={{fontWeight:600,fontSize:14}}>{a.client}</div><div style={{fontSize:12,color:C.sub,marginTop:2}}>{serviceLabel(a.service,lang)}</div><div style={{marginTop:5}}>{a.source==="online"?<span style={pill(C.greenLight,C.green)}>{tr("pillOnline")}</span>:<span style={pill(C.pinkLight,C.pinkDark)}>{tr("pillManual")}</span>}</div></div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:C.pinkDark}}>${a.price}</div>
              </div>
            </div>
          ))
        }
        {selAppt&&(
          <div style={overlay} onClick={()=>setSelAppt(null)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div style={{fontWeight:700,fontSize:17}}>{selAppt.client}</div><button onClick={()=>setSelAppt(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>✕</button></div>
              {[{l:tr("lblService"),v:serviceLabel(selAppt.service,lang)},{l:tr("lblTime"),v:fmt12Loc(selAppt.time,lang)},{l:tr("lblDuration"),v:durText(selAppt.duration,lang)},{l:tr("lblPrice"),v:`$${selAppt.price}`},{l:tr("lblPhone"),v:selAppt.phone}].map((item,i)=>(
                <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:16}}>
                <button style={{...btnGhost,flex:1}} onClick={()=>{setAppts(appts.filter(a=>a.id!==selAppt.id));setSelAppt(null);}}>{tr("btnCancelAppt")}</button>
                <a href={`tel:${selAppt.phone}`} style={{...btn,flex:1,textDecoration:"none",textAlign:"center",display:"block"}}>{tr("btnCall")}</a>
              </div>
            </div>
          </div>
        )}
        {showAddAppt&&(
          <div style={overlay} onClick={()=>setShowAddAppt(false)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleAddAppt")}</div>
              <div style={{marginBottom:10}}><label style={lbl}>{tr("lblClientName")}</label><input style={inp} value={newAppt.client} onChange={e=>setNewAppt({...newAppt,client:e.target.value})}/></div>
              <div style={{marginBottom:10}}><label style={lbl}>{tr("lblPhone")}</label><input style={inp} value={newAppt.phone} onChange={e=>setNewAppt({...newAppt,phone:e.target.value})}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div><label style={lbl}>{tr("lblTime")}</label><input style={inp} type="time" value={newAppt.time} onChange={e=>setNewAppt({...newAppt,time:e.target.value})}/></div>
                <div><label style={lbl}>{tr("lblService")}</label><select style={inp} value={newAppt.service} onChange={e=>setNewAppt({...newAppt,service:e.target.value})}>{SERVICES.map(s=><option key={s.id} value={s.name}>{serviceLabel(s.name,lang)}</option>)}</select></div>
              </div>
              <button style={btn} onClick={()=>{if(newAppt.client){const svc=SERVICES.find(s=>s.name===newAppt.service);setAppts([...appts,{id:Date.now(),date:selDate,time:newAppt.time,duration:svc.duration,service:svc.name,price:svc.price,client:newAppt.client,phone:newAppt.phone,source:"manual"}]);setNewAppt({time:"09:00",service:"Gel Manicure",client:"",phone:""});setShowAddAppt(false);}}}>{tr("btnAddAppt")}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENTS ───────────────────────────────────────────────────────
  const renderClients = () => {
    const filtered = clients.filter(c=>c.name.toLowerCase().includes(clientSearch.toLowerCase()));
    return (
      <div>
        <TopBar title={tr("titleClients")} action={<button onClick={()=>setShowAddClient(true)} style={btnSm}>{tr("btnAdd")}</button>}/>
        <input style={{...inp,marginBottom:12}} placeholder={tr("placeholderSearchClients")} value={clientSearch} onChange={e=>setClientSearch(e.target.value)}/>
        {filtered.map(c=>(
          <div key={c.id} style={{...card,cursor:"pointer"}} onClick={()=>setSelClient(c)}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:C.pinkLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:C.pinkDark,flexShrink:0}}>{c.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{c.name}</div>
                <div style={{fontSize:11,color:C.sub,marginTop:2}}>{c.phone}</div>
                {c.notes&&<div style={{marginTop:5}}><span style={pill(C.amberLight,C.amber)}>{tr("pillNote")}</span></div>}
              </div>
              <div style={{color:C.border,fontSize:18}}>›</div>
            </div>
          </div>
        ))}
        {selClient&&(
          <div style={overlay} onClick={()=>setSelClient(null)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontWeight:700,fontSize:18}}>{selClient.name}</div><button onClick={()=>setSelClient(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>✕</button></div>
              {[{l:tr("lblPhone"),v:selClient.phone,link:`tel:${selClient.phone.replace(/\s/g,"")}`},{l:tr("lblEmail"),v:selClient.email},{l:tr("lblDob"),v:fmtDateLoc(selClient.dob,lang)},{l:tr("lblClientSince"),v:fmtDateLoc(selClient.joined,lang)}].map((item,i)=>(
                <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div>{item.link?<a href={item.link} style={{fontSize:13,fontWeight:600,color:C.pinkDark,textDecoration:"none"}}>{item.v}</a>:<div style={{fontSize:13,fontWeight:600}}>{item.v}</div>}</div>
              ))}
              {selClient.notes&&<div style={{background:C.amberLight,borderRadius:10,padding:12,marginTop:14}}><div style={{fontSize:10,fontWeight:700,color:C.amber,marginBottom:5}}>{tr("labelNotesHeader")}</div><div style={{fontSize:13,lineHeight:1.6}}>{selClient.notes}</div></div>}
            </div>
          </div>
        )}
        {showAddClient&&(
          <div style={overlay} onClick={()=>setShowAddClient(false)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleNewClient")}</div>
              {[{l:tr("lblFullName"),k:"name",t:"text"},{l:tr("lblPhone"),k:"phone",t:"tel"},{l:tr("lblEmail"),k:"email",t:"email"},{l:tr("lblDob"),k:"dob",t:"date"}].map(f=>(
                <div key={f.k} style={{marginBottom:10}}><label style={lbl}>{f.l}</label><input style={inp} type={f.t} value={newClient[f.k]} onChange={e=>setNewClient({...newClient,[f.k]:e.target.value})}/></div>
              ))}
              <div style={{marginBottom:14}}><label style={lbl}>{tr("lblNotes")}</label><textarea style={{...inp,height:60,resize:"none"}} value={newClient.notes} onChange={e=>setNewClient({...newClient,notes:e.target.value})}/></div>
              <button style={btn} onClick={()=>{if(newClient.name){setClients([...clients,{id:Date.now(),...newClient,joined:todayStr()}]);setNewClient({name:"",phone:"",email:"",dob:"",notes:""});setShowAddClient(false);}}}>{tr("btnAddClient")}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── FINANCES ──────────────────────────────────────────────────────
  const renderFinances = () => (
    <div>
      <TopBar title={tr("titleFinances")}/>
      <div style={{...card,display:"flex",justifyContent:"space-around",textAlign:"center",padding:"14px 10px",marginBottom:14}}>
        {[{k:"statIncome",v:`$${totalIn.toLocaleString()}`,c:C.green},{k:"statExpenses",v:`$${totalOut.toLocaleString()}`,c:C.amber},{k:"statNet",v:`$${(totalIn-totalOut).toLocaleString()}`,c:(totalIn-totalOut)>=0?C.green:C.red}].map((s,i)=>(
          <div key={i}><div style={{fontSize:19,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:C.mute,textTransform:"uppercase"}}>{tr(s.k)}</div></div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["income","expenses"].map(ft=><button key={ft} onClick={()=>setFinTab(ft)} style={{flex:1,padding:9,borderRadius:9,border:"none",fontWeight:600,fontSize:12,cursor:"pointer",background:finTab===ft?C.pinkDark:C.pinkLight,color:finTab===ft?"#fff":C.pinkDark,textTransform:"capitalize"}}>{tr(ft==="income"?"tabIncome":"tabExpenses")}</button>)}
      </div>
      {finTab==="income"&&(
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={stitle}>{tr("tabIncome")}</div><button onClick={()=>setShowAddIncome(true)} style={btnSm}>{tr("btnAdd")}</button></div>
          {income.map(item=>(
            <div key={item.id} style={row}><div><div style={{fontSize:13,fontWeight:500}}>{item.client}</div><div style={{fontSize:10,color:C.sub}}>{item.type} · {fmtDateLoc(item.date,lang)}</div></div><div style={{fontSize:14,fontWeight:700,color:C.green}}>${item.amount}</div></div>
          ))}
        </div>
      )}
      {finTab==="expenses"&&(
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={stitle}>{tr("tabExpenses")}</div><button onClick={()=>setShowAddExpense(true)} style={btnSm}>{tr("btnAdd")}</button></div>
          {expenses.map(item=>{const cat=EXPENSE_CATS.find(c=>c.key===item.category);return(<div key={item.id} style={row}><div style={{display:"flex",gap:8}}><span style={{fontSize:16}}>{cat?.icon}</span><div><div style={{fontSize:13,fontWeight:500}}>{item.description}</div><div style={{fontSize:10,color:C.sub}}>{fmtDateLoc(item.date,lang)}</div></div></div><div style={{fontSize:14,fontWeight:700,color:C.amber}}>${item.amount}</div></div>);})}
        </div>
      )}
      {showAddIncome&&(
        <div style={overlay} onClick={()=>setShowAddIncome(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleRecordIncome")}</div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblDate")}</label><input style={inp} type="date" value={newIncome.date} onChange={e=>setNewIncome({...newIncome,date:e.target.value})}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblClient")}</label><select style={inp} value={newIncome.client} onChange={e=>setNewIncome({...newIncome,client:e.target.value})}><option value="">{tr("optionSelect")}</option>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblType")}</label><input style={inp} value={newIncome.type} onChange={e=>setNewIncome({...newIncome,type:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div><label style={lbl}>{tr("lblAmount")}</label><input style={inp} type="number" value={newIncome.amount} onChange={e=>setNewIncome({...newIncome,amount:e.target.value})}/></div>
              <div><label style={lbl}>{tr("lblMethod")}</label><select style={inp} value={newIncome.method} onChange={e=>setNewIncome({...newIncome,method:e.target.value})}>{["Card","Cash","Bank transfer"].map(m=><option key={m} value={m}>{methodLabel(m,lang)}</option>)}</select></div>
            </div>
            <button style={btn} onClick={()=>{if(newIncome.amount){setIncome([...income,{id:Date.now(),...newIncome,amount:parseFloat(newIncome.amount)}]);setShowAddIncome(false);}}}>{tr("btnSave")}</button>
          </div>
        </div>
      )}
      {showAddExpense&&(
        <div style={overlay} onClick={()=>setShowAddExpense(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleRecordExpense")}</div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblDate")}</label><input style={inp} type="date" value={newExpense.date} onChange={e=>setNewExpense({...newExpense,date:e.target.value})}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblCategory")}</label><select style={inp} value={newExpense.category} onChange={e=>setNewExpense({...newExpense,category:e.target.value})}>{EXPENSE_CATS.map(c=><option key={c.key} value={c.key}>{c.icon} {tr(`expenseCat_${c.key}`)}</option>)}</select></div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblDescription")}</label><input style={inp} value={newExpense.description} onChange={e=>setNewExpense({...newExpense,description:e.target.value})}/></div>
            <div style={{marginBottom:14}}><label style={lbl}>{tr("lblAmount")}</label><input style={inp} type="number" value={newExpense.amount} onChange={e=>setNewExpense({...newExpense,amount:e.target.value})}/></div>
            <button style={btn} onClick={()=>{if(newExpense.amount){setExpenses([...expenses,{id:Date.now(),...newExpense,amount:parseFloat(newExpense.amount)}]);setShowAddExpense(false);}}}>{tr("btnSave")}</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── PRICES ────────────────────────────────────────────────────────
  const renderPrices = () => (
    <div>
      <TopBar title={tr("titlePriceList")} action={<button onClick={()=>window.print()} style={btnSm}>{tr("btnPrint")}</button>}/>
      <div id="price-card" style={{background:C.card,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(42,33,24,0.10)",marginBottom:12}}>
        <div style={{background:`linear-gradient(135deg, #7A6D63 0%, #9C8E84 100%)`,padding:"28px 22px 20px",textAlign:"center"}}>
          <div style={{fontFamily:"'Dancing Script',cursive",fontSize:32,fontWeight:700,color:"#fff"}}>{studioName}</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",marginTop:5,letterSpacing:"0.2em",textTransform:"uppercase"}}>{tr("priceMenuSubtitle")}</div>
          <div style={{width:24,height:1,background:"rgba(255,255,255,0.3)",margin:"10px auto 0"}}/>
        </div>
        <div style={{padding:"18px 20px"}}>
          {prices.filter(p=>p.active).map((item,i)=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<prices.filter(p=>p.active).length-1?`1px solid ${C.border}`:"none"}}>
              <div><div style={{fontWeight:600,fontSize:14}}>{serviceLabel(item.name,lang)}</div><div style={{fontSize:11,color:C.sub,marginTop:2}}>⏱ {durText(item.duration,lang)}</div></div>
              <div style={{fontSize:19,fontWeight:800,color:C.pinkDark,fontFamily:"'Playfair Display',serif"}}>${item.price}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.pinkLight,padding:"12px 20px",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:600,color:C.pinkDark}}>{tr("priceBookOnline")}</div>
        </div>
      </div>
      <div className="no-print" style={{...card,background:C.greenLight,border:`1px solid ${C.green}30`}}>
        <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:6}}>{tr("shareTitle")}</div>
        <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{tr("shareDesc")}</div>
      </div>
    </div>
  );

  // ── STOCK & TODO ──────────────────────────────────────────────────
  const renderStock = () => (
    <div>
      <TopBar title={tr("titleStock")}/>
      <div style={card}>
        <div style={stitle}>{tr("stitleTodo")}</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <input style={{...inp,flex:1}} placeholder={tr("placeholderTodo")} value={newTodo} onChange={e=>setNewTodo(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newTodo.trim()){setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]);setNewTodo("");}}}/>
          <button style={btnSm} onClick={()=>{if(newTodo.trim()){setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]);setNewTodo("");}}} >+</button>
        </div>
        {todos.map(t=>(
          <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={chk(t.done)} onClick={()=>setTodos(todos.map(td=>td.id===t.id?{...td,done:!td.done}:td))}>{t.done&&<span style={{color:"#fff",fontSize:9}}>✓</span>}</div>
            <div style={{flex:1,fontSize:13,color:t.done?C.mute:C.text,textDecoration:t.done?"line-through":"none"}}>{t.text}</div>
            <button onClick={()=>setTodos(todos.filter(td=>td.id!==t.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={stitle}>{tr("stitleStock")}</div>
          <button onClick={()=>setShowAddStock(true)} style={btnSm}>{tr("btnAdd")}</button>
        </div>
        {stock.map(item=>{
          const low=item.qty<=item.reorder;
          return (
            <div key={item.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:600,fontSize:13}}>{item.name}</div><div style={{fontSize:10,color:C.sub}}>{tr("reorderPrefix")} {item.reorder} {unitLabel(item.unit,lang)}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:18,fontWeight:800,color:low?C.red:C.pinkDark}}>{item.qty}</div>
                  <button onClick={()=>setStock(stock.map(s=>s.id===item.id?{...s,qty:Math.max(0,s.qty-1)}:s))} style={{background:C.pinkLight,border:"none",borderRadius:6,width:26,height:26,fontSize:14,fontWeight:700,color:C.pinkDark,cursor:"pointer"}}>−</button>
                  <button onClick={()=>setStock(stock.map(s=>s.id===item.id?{...s,qty:s.qty+1}:s))} style={{background:C.pinkLight,border:"none",borderRadius:6,width:26,height:26,fontSize:14,fontWeight:700,color:C.pinkDark,cursor:"pointer"}}>+</button>
                  <button onClick={()=>setStock(stock.filter(s=>s.id!==item.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button>
                </div>
              </div>
              {low&&<div style={{marginTop:6,fontSize:10,color:C.red,fontWeight:600}}>{tr("lowStockWarning")}</div>}
            </div>
          );
        })}
      </div>
      {showAddStock&&(
        <div style={overlay} onClick={()=>setShowAddStock(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleAddStock")}</div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblItemName")}</label><input style={inp} placeholder={tr("placeholderItemName")} value={newStock.name} onChange={e=>setNewStock({...newStock,name:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              <div><label style={lbl}>{tr("lblQty")}</label><input style={inp} type="number" placeholder={tr("placeholderZero")} value={newStock.qty} onChange={e=>setNewStock({...newStock,qty:e.target.value})}/></div>
              <div><label style={lbl}>{tr("lblReorderAt")}</label><input style={inp} type="number" placeholder={tr("placeholderZero")} value={newStock.reorder} onChange={e=>setNewStock({...newStock,reorder:e.target.value})}/></div>
              <div><label style={lbl}>{tr("lblUnit")}</label><select style={inp} value={newStock.unit} onChange={e=>setNewStock({...newStock,unit:e.target.value})}>{["pcs","packs","bottles","boxes","sets"].map(u=><option key={u} value={u}>{unitLabel(u,lang)}</option>)}</select></div>
            </div>
            <button style={btn} onClick={()=>{if(newStock.name){setStock([...stock,{id:Date.now(),name:newStock.name,qty:parseInt(newStock.qty)||0,reorder:parseInt(newStock.reorder)||0,unit:newStock.unit}]);setNewStock({name:"",qty:"",reorder:"",unit:"pcs"});setShowAddStock(false);}}}>{tr("btnAddItem")}</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── BOOKING SETTINGS ──────────────────────────────────────────────
  const renderSettings = () => (
    <div>
      <TopBar title={tr("titleSettings")}/>
      <div style={card}>
        <div style={stitle}>{tr("stitleSlotLength")}</div>
        <div style={{display:"flex",gap:6,marginBottom:8}}>
          {[15,30,45,60,90].map(v=><button key={v} onClick={()=>setSlotLength(v)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",background:slotLength===v?C.pinkDark:C.pinkLight,color:slotLength===v?"#fff":C.pinkDark}}>{slotLabel(v,lang)}</button>)}
        </div>
      </div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={stitle}>{tr("stitleBlockedDates")}</div><button onClick={()=>setShowAddBlocked(true)} style={btnSm}>{tr("btnBlock")}</button></div>
        {blockedDates.map(b=>(
          <div key={b.id} style={row}><div><div style={{fontSize:13,fontWeight:600}}>{fmtDateLoc(b.date,lang)}</div><div style={{fontSize:11,color:C.sub}}>{b.reason}</div></div><button onClick={()=>setBlockedDates(blockedDates.filter(bd=>bd.id!==b.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button></div>
        ))}
      </div>
      <div style={card}>
        <div style={stitle}>{tr("stitleDeposit")}</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div onClick={()=>setRequireDeposit(!requireDeposit)} style={{width:38,height:22,borderRadius:12,background:requireDeposit?C.pinkDark:"#E0DADC",position:"relative",cursor:"pointer"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:requireDeposit?18:2,transition:"left 0.2s"}}/>
          </div>
          <div style={{fontSize:13,fontWeight:600}}>{tr("lblRequestDeposit")}</div>
        </div>
        {requireDeposit&&(
          <>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblDepositAmount")}</label><input style={inp} type="number" value={depositAmount} onChange={e=>setDepositAmount(e.target.value)}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblAccountName")}</label><input style={inp} value={bankDetails.accountName} onChange={e=>setBankDetails({...bankDetails,accountName:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><label style={lbl}>{tr("lblBsb")}</label><input style={inp} value={bankDetails.bsb} onChange={e=>setBankDetails({...bankDetails,bsb:e.target.value})}/></div>
              <div><label style={lbl}>{tr("lblAccountNo")}</label><input style={inp} value={bankDetails.accountNumber} onChange={e=>setBankDetails({...bankDetails,accountNumber:e.target.value})}/></div>
            </div>
            <label style={lbl}>{tr("lblCustomMessage")}</label>
            <textarea style={{...inp,height:70,resize:"none"}} value={customMessage} onChange={e=>setCustomMessage(e.target.value)}/>
          </>
        )}
      </div>
      <button style={btn}>{tr("btnSaveSettings")}</button>
      {showAddBlocked&&(
        <div style={overlay} onClick={()=>setShowAddBlocked(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>{tr("titleBlockDate")}</div>
            <div style={{marginBottom:10}}><label style={lbl}>{tr("lblDate")}</label><input style={inp} type="date" value={newBlocked.date} onChange={e=>setNewBlocked({...newBlocked,date:e.target.value})}/></div>
            <div style={{marginBottom:14}}><label style={lbl}>{tr("lblReason")}</label><input style={inp} value={newBlocked.reason} onChange={e=>setNewBlocked({...newBlocked,reason:e.target.value})}/></div>
            <button style={btn} onClick={()=>{if(newBlocked.date){setBlockedDates([...blockedDates,{id:Date.now(),...newBlocked}]);setNewBlocked({date:"",reason:""});setShowAddBlocked(false);}}}>{tr("btnBlockDate")}</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── SUPPORT ───────────────────────────────────────────────────────
  const renderSupport = () => {
    // Hong Kong businesses don't have ABN/GST/BAS — the /hk region sees
    // region-appropriate topics (audit/bookkeeping/taxation & tax return/registration)
    // regardless of which display language is currently selected.
    const activeCpaTopics = region==="hk" ? CPA_TOPICS_HK : CPA_TOPICS;
    const chip=(sel,color,light)=>({display:"flex",alignItems:"center",gap:8,padding:"11px 12px",borderRadius:10,cursor:"pointer",background:sel?color:light,border:`1.5px solid ${sel?color:C.border}`,marginBottom:8});
    const sendSupport = async (payload) => {
      try {
        const res = await fetch("/api/send-support",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            ...payload,
            studioName,
            clientName: supportName,
            clientEmail: supportEmail,
            clientPhone: supportPhone,
          })
        });
        if (!res.ok) throw new Error("API failed");
      } catch(e) {
        const subject = payload.type==="cpa" ? `Business Support — ${supportName||studioName}` : `IT Support — ${supportName||studioName}`;
        const body = `Name: ${supportName}\nEmail: ${supportEmail}\nPhone: ${supportPhone}\n\n`
          + (payload.type==="cpa"
            ? `Topics: ${(payload.topics||[]).join(", ")}\n\nDetails: ${payload.message||"—"}`
            : `Issue: ${(payload.topics||[])[0]||"—"}\n\nDescription: ${payload.message||"—"}\nUrgent: ${payload.urgent?"Yes":"No"}`);
        window.location.href = `mailto:account@ollieconsult.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    };
    return (
      <div>
        <TopBar title={tr("titleSupport")}/>
        {!supportSent?(
          <>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button onClick={()=>setSupportTab("cpa")} style={{flex:1,padding:11,borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:supportTab==="cpa"?C.pinkDark:C.pinkLight,color:supportTab==="cpa"?"#fff":C.pinkDark}}>{tr("tabCpa")}</button>
              <button onClick={()=>setSupportTab("it")} style={{flex:1,padding:11,borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:supportTab==="it"?C.blue:C.blueLight,color:supportTab==="it"?"#fff":C.blue}}>{tr("tabIt")}</button>
            </div>
            {supportTab==="cpa"&&(
              <div>
                <div style={{...card,background:C.pinkLight}}><div style={{fontSize:12,color:C.pinkDark,lineHeight:1.6}}>{tr(region==="hk"?"cpaInfoBannerHk":"cpaInfoBanner")}</div></div>
                <div style={{marginBottom:10}}><label style={lbl}>{tr("lblYourName")}</label><input style={inp} placeholder="e.g. Sarah Chen" value={supportName} onChange={e=>setSupportName(e.target.value)}/></div>
                <div style={{marginBottom:10}}><label style={lbl}>{tr("lblYourEmail")}</label><input style={inp} type="email" placeholder="sarah@email.com" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)}/></div>
                <div style={{marginBottom:14}}><label style={lbl}>{tr("lblYourPhone")}</label><input style={inp} type="tel" placeholder="0412 345 678" value={supportPhone} onChange={e=>setSupportPhone(e.target.value)}/></div>
                <div style={stitle}>{tr("cpaQuestion")}</div>
                {activeCpaTopics.map(t=>(
                  <div key={t.id} onClick={()=>setCpaTopics(cpaTopics.includes(t.id)?cpaTopics.filter(x=>x!==t.id):[...cpaTopics,t.id])} style={chip(cpaTopics.includes(t.id),C.pinkDark,C.pinkLight)}>
                    <span>{t.icon}</span><span style={{fontSize:13,fontWeight:600,color:cpaTopics.includes(t.id)?"#fff":C.text,flex:1}}>{tr(`cpaTopic_${t.id}`)}</span>
                    {cpaTopics.includes(t.id)&&<span style={{color:"#fff"}}>✓</span>}
                  </div>
                ))}
                <div style={{margin:"14px 0"}}><label style={lbl}>{tr("lblAdditionalDetails")}</label><textarea style={{...inp,height:70,resize:"none"}} value={cpaMessage} onChange={e=>setCpaMessage(e.target.value)}/></div>
                <button style={{...btn,opacity:cpaTopics.length?1:0.4}} onClick={async()=>{if(!cpaTopics.length)return;const payload={type:"cpa",topics:cpaTopics.map(id=>activeCpaTopics.find(t=>t.id===id)?.label).filter(Boolean),message:cpaMessage};setSupportSent(payload);await sendSupport(payload);}}>{tr("btnSendRequest")}</button>
              </div>
            )}
            {supportTab==="it"&&(
              <div>
                <div style={{...card,background:C.blueLight}}><div style={{fontSize:12,color:C.blue,lineHeight:1.6}}>{tr("itInfoBanner")}</div></div>
                <div style={{marginBottom:10}}><label style={lbl}>{tr("lblYourName")}</label><input style={inp} placeholder="e.g. Sarah Chen" value={supportName} onChange={e=>setSupportName(e.target.value)}/></div>
                <div style={{marginBottom:10}}><label style={lbl}>{tr("lblYourEmail")}</label><input style={inp} type="email" placeholder="sarah@email.com" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)}/></div>
                <div style={{marginBottom:14}}><label style={lbl}>{tr("lblYourPhone")}</label><input style={inp} type="tel" placeholder="0412 345 678" value={supportPhone} onChange={e=>setSupportPhone(e.target.value)}/></div>
                <div style={stitle}>{tr("itQuestion")}</div>
                {IT_TOPICS.map(t=>(
                  <div key={t.id} onClick={()=>setItTopic(t.id)} style={chip(itTopic===t.id,C.blue,C.blueLight)}>
                    <span>{t.icon}</span><span style={{fontSize:13,fontWeight:600,color:itTopic===t.id?"#fff":C.text,flex:1}}>{tr(`itTopic_${t.id}`)}</span>
                    {itTopic===t.id&&<span style={{color:"#fff"}}>✓</span>}
                  </div>
                ))}
                <div style={{margin:"14px 0"}}><label style={lbl}>{tr("lblDescribeIssue")}</label><textarea style={{...inp,height:80,resize:"none"}} value={itMessage} onChange={e=>setItMessage(e.target.value)}/></div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <div onClick={()=>setItUrgent(!itUrgent)} style={{width:38,height:22,borderRadius:12,background:itUrgent?C.red:"#E0DADC",position:"relative",cursor:"pointer"}}><div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:itUrgent?18:2,transition:"left 0.2s"}}/></div>
                  <div style={{fontSize:13,fontWeight:600}}>{tr("lblUrgent")}</div>
                </div>
                <button style={{...btn,background:C.blue,opacity:itTopic?1:0.4}} onClick={async()=>{if(!itTopic)return;const payload={type:"it",topics:[IT_TOPICS.find(t=>t.id===itTopic).label],message:itMessage,urgent:itUrgent};setSupportSent(payload);await sendSupport(payload);}}>{tr("btnSendIt")}</button>
              </div>
            )}
          </>
        ):(
          <div style={{textAlign:"center",paddingTop:20}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>✓</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:600,marginBottom:8}}>{tr("supportSentTitle")}</div>
            <div style={{fontSize:13,color:C.sub,marginBottom:20}}>{tr("supportSentDesc")}</div>
            <button style={btn} onClick={()=>{setSupportSent(null);setCpaTopics([]);setCpaMessage("");setItTopic(null);setItMessage("");setItUrgent(false);setSupportName("");setSupportEmail("");setSupportPhone("");}}>{tr("btnSendAnother")}</button>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENT BOOKING ────────────────────────────────────────────────
  const renderBooking = () => {
    const bkDates = getBkDates();
    const bkSlots = bkDate ? getSlots(bkDate.toISOString().split("T")[0], bkService?.duration||60) : [];
    return (
      <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh"}}>
        <div style={{background:`linear-gradient(135deg, #7A6D63 0%, #9C8E84 100%)`,padding:"20px 18px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <button onClick={()=>{setScreen("appointments");setBkStep(1);setBkService(null);setBkDate(null);setBkSlot(null);setBkForm({name:"",email:"",phone:"",note:""});}} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}}>{tr("btnBack")}</button>
            <div style={{fontFamily:"'Dancing Script',cursive",fontSize:20,fontWeight:700,color:"#fff"}}>{studioName}</div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {[1,2,3,4].map(n=><div key={n} style={{flex:1,height:3,borderRadius:3,background:bkStep>=n?"#fff":"rgba(255,255,255,0.25)",transition:"all 0.3s"}}/>)}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>{tr("bookStepPrefix")} {Math.min(bkStep,4)} {tr("bookStepOf")} — {["",tr("bookStepChoose"),tr("bookStepPickDate"),tr("bookStepDetails"),tr("bookStepConfirm")][bkStep]||tr("bookStepDone")}</div>
        </div>
        <div style={{padding:"20px 16px"}}>
          {bkStep===1&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{tr("bookStep1Title")}</div>
              <div style={{fontSize:12,color:C.sub,marginBottom:16}}>{tr("bookStep1Sub")}</div>
              {SERVICES.map(svc=>(
                <div key={svc.id} onClick={()=>{setBkService(svc);setBkStep(2);}} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:`1.5px solid ${bkService?.id===svc.id?C.pinkDark:C.border}`}}>
                  <div><div style={{fontWeight:600,fontSize:14}}>{serviceLabel(svc.name,lang)}</div><div style={{fontSize:11,color:C.sub,marginTop:2}}>⏱ {durText(svc.duration,lang)}</div></div>
                  <div style={{fontSize:18,fontWeight:800,color:C.pinkDark}}>${svc.price}</div>
                </div>
              ))}
            </div>
          )}
          {bkStep===2&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:2}}>{serviceLabel(bkService?.name,lang)}</div>
              <div style={{fontSize:11,color:C.pinkDark,fontWeight:500,marginBottom:14}}>{tr("bookTimezoneNote")}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>{tr("bookSelectDate")}</div>
              <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
                {bkDates.map((d,i)=>{
                  const ds=d.toISOString().split("T")[0];
                  const avail=getSlots(ds,bkService?.duration||60).length;
                  const sel=bkDate?.toISOString().split("T")[0]===ds;
                  return(
                    <div key={i} onClick={()=>avail>0&&(setBkDate(d),setBkSlot(null))} style={{flexShrink:0,width:50,borderRadius:11,padding:"7px 4px",textAlign:"center",cursor:avail>0?"pointer":"not-allowed",background:sel?C.pinkDark:C.card,border:`1.5px solid ${sel?C.pinkDark:C.border}`,opacity:avail===0?0.35:1}}>
                      <div style={{fontSize:8.5,fontWeight:700,color:sel?"rgba(255,255,255,0.7)":C.sub}}>{weekdayShort(d,lang)}</div>
                      <div style={{fontSize:15,fontWeight:700,color:sel?"#fff":C.text,margin:"2px 0"}}>{d.getDate()}</div>
                      <div style={{fontSize:8,color:sel?"rgba(255,255,255,0.6)":C.mute}}>{avail===0?tr("bookFull"):monthOnly(d,lang)}</div>
                    </div>
                  );
                })}
              </div>
              {bkDate&&(
                <>
                  <div style={{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>{tr("bookAvailableTimesPrefix")} {monthDayText(bkDate,lang)}</div>
                  {bkSlots.length===0?<div style={{...card,textAlign:"center",padding:20,color:C.sub}}>{tr("bookFullyBooked")}</div>:
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                      {bkSlots.map((t,i)=>(
                        <div key={i} onClick={()=>setBkSlot(t)} style={{padding:"11px 8px",borderRadius:10,textAlign:"center",cursor:"pointer",background:bkSlot===t?C.pinkDark:C.card,border:`1.5px solid ${bkSlot===t?C.pinkDark:C.border}`,fontSize:13,fontWeight:600,color:bkSlot===t?"#fff":C.text}}>{fmt12Loc(t,lang)}</div>
                      ))}
                    </div>
                  }
                </>
              )}
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(1)}>{tr("btnBack")}</button>
                <button style={{...btn,opacity:bkSlot?1:0.4}} onClick={()=>bkSlot&&setBkStep(3)}>{tr("btnContinue")}</button>
              </div>
            </div>
          )}
          {bkStep===3&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{tr("bookStep3Title")}</div>
              <div style={{...card,background:C.pinkLight,marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:14}}>{serviceLabel(bkService?.name,lang)}</div>
                <div style={{fontSize:12,color:C.sub,marginTop:2}}>{bkDate&&monthDayText(bkDate,lang)} · {bkSlot&&fmt12Loc(bkSlot,lang)} AEDT</div>
                <div style={{fontSize:16,fontWeight:800,color:C.pinkDark,marginTop:6}}>${bkService?.price}</div>
              </div>
              {requireDeposit&&(
                <div style={{background:C.amberLight,borderRadius:10,padding:"10px 14px",marginBottom:14,border:`1px solid ${C.amber}30`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.amber,marginBottom:6}}>{tr("bookDepositRequiredPrefix")} ${depositAmount}</div>
                  <div style={{fontSize:12,color:C.text,lineHeight:1.6}}><strong>{tr("lblAccountInline")}</strong> {bankDetails.accountName}<br/><strong>{tr("lblBsbInline")}</strong> {bankDetails.bsb}<br/><strong>{tr("lblNoInline")}</strong> {bankDetails.accountNumber}<br/><span style={{fontStyle:"italic",color:C.sub}}>{customMessage}</span></div>
                </div>
              )}
              {[{l:tr("lblFullNameReq"),k:"name",t:"text",p:"e.g. Sarah Chen"},{l:tr("lblEmailReq"),k:"email",t:"email",p:"sarah@email.com"},{l:tr("lblPhoneReq"),k:"phone",t:"tel",p:"0412 345 678"},{l:tr("lblNotesOpt"),k:"note",t:"text",p:tr("placeholderAllergies")}].map(f=>(
                <div key={f.k} style={{marginBottom:10}}><label style={lbl}>{f.l}</label><input style={inp} type={f.t} placeholder={f.p} value={bkForm[f.k]} onChange={e=>setBkForm({...bkForm,[f.k]:e.target.value})}/></div>
              ))}
              <div style={{fontSize:11,color:C.mute,marginBottom:14,lineHeight:1.6}}>{tr("bookCancellationPolicy")}</div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(2)}>{tr("btnBack")}</button>
                <button style={{...btn,opacity:bkForm.name&&bkForm.email&&bkForm.phone?1:0.4}} onClick={()=>bkForm.name&&bkForm.email&&bkForm.phone&&setBkStep(4)}>{tr("btnReview")}</button>
              </div>
            </div>
          )}
          {bkStep===4&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{tr("bookStep4Title")}</div>
              <div style={{...card,marginBottom:10}}>
                {[{l:tr("lblService"),v:serviceLabel(bkService?.name,lang)},{l:tr("lblDate"),v:bkDate&&monthDayText(bkDate,lang)},{l:tr("lblTime"),v:bkSlot&&`${fmt12Loc(bkSlot,lang)} AEDT`},{l:tr("lblDuration"),v:durText(bkService?.duration,lang)},{l:tr("lblPrice"),v:`$${bkService?.price}`}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{...card,marginBottom:14}}>
                {[{l:tr("lblName"),v:bkForm.name},{l:tr("lblEmail"),v:bkForm.email},{l:tr("lblPhone"),v:bkForm.phone}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(3)}>{tr("btnBack")}</button>
                <button style={btn} onClick={()=>setBkStep(5)}>{tr("btnConfirmBooking")}</button>
              </div>
            </div>
          )}
          {bkStep===5&&(
            <div style={{textAlign:"center",paddingTop:20}}>
              <div style={{width:68,height:68,borderRadius:"50%",background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px"}}>✓</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:600,marginBottom:8}}>{tr("bookSuccessTitle")}</div>
              <div style={{fontSize:13,color:C.sub,marginBottom:20,lineHeight:1.6}}>{tr("bookSuccessSubtitle")}<br/><strong style={{color:C.text}}>{bkForm.email}</strong></div>
              <div style={{...card,textAlign:"left",marginBottom:16}}>
                {[{l:tr("lblReference"),v:bkRef,a:true},{l:tr("lblService"),v:serviceLabel(bkService?.name,lang)},{l:tr("lblDateTime"),v:`${bkDate&&monthDayText(bkDate,lang)} · ${bkSlot&&fmt12Loc(bkSlot,lang)} AEDT`}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:700,color:item.a?C.pinkDark:C.text}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{background:C.pinkLight,borderRadius:12,padding:"12px 16px",marginBottom:20,textAlign:"left"}}>
                <div style={{fontSize:12,color:C.pinkDark,lineHeight:1.7}}>{tr("bookSuccessNote1")}<br/>{tr("bookSuccessNote2")}<br/>{tr("bookSuccessNote3")}</div>
              </div>
              <button style={btn} onClick={()=>{setBkStep(1);setBkService(null);setBkDate(null);setBkSlot(null);setBkForm({name:"",email:"",phone:"",note:""});}}>{tr("btnBookAnother")}</button>
              <button style={{...btnGhost,marginTop:10}} onClick={()=>setScreen("appointments")}>{tr("btnBackToDashboard")}</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────
  let content;
  if      (screen==="dashboard")    content = renderDashboard();
  else if (screen==="appointments") content = renderAppointments();
  else if (screen==="clients")      content = renderClients();
  else if (screen==="finances")     content = renderFinances();
  else if (screen==="prices")       content = renderPrices();
  else if (screen==="stock")        content = renderStock();
  else if (screen==="settings")     content = renderSettings();
  else if (screen==="support")      content = renderSupport();
  else if (screen==="booking")      content = renderBooking();
  else                              content = renderDashboard();

  // Only shown when the region offers more than one language (root/AU demo is English-only).
  const langToggle = allowedLangs.length > 1 ? (
    <button onClick={cycleLang} style={{background:"rgba(255,255,255,0.35)",border:"none",borderRadius:6,padding:"1px 7px",fontSize:10,fontWeight:700,color:C.text,cursor:"pointer",marginLeft:8,lineHeight:1.6}}>{langChip[lang]}</button>
  ) : null;

  if (screen==="booking") {
    return (
      <div style={{fontFamily:"'Inter',system-ui,sans-serif",maxWidth:520,margin:"0 auto"}}>
        <div style={{background:C.sidebar,padding:"6px 16px",textAlign:"center"}}>
          <span style={{fontSize:11,color:C.text,opacity:0.7}}>✦ <strong>{tr("demoBannerBrand")}</strong> — <a href="https://naildesk.shop" style={{color:C.pinkDark,textDecoration:"none",fontWeight:600}}>{tr("demoBannerGetOwn")}</a></span>
          {langToggle}
        </div>
        {content}
        <div style={{padding:"10px",textAlign:"center",background:C.card,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontSize:10,color:C.mute}}>{tr("footerText")}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:520,margin:"0 auto"}}>
      <div style={{background:C.sidebar,padding:"7px 16px",textAlign:"center",flexShrink:0}}>
        <span style={{fontSize:11,color:C.text,opacity:0.7}}>✦ <strong>{tr("demoBannerBrand")}</strong> — {tr("demoBannerSampleData")} <a href="https://naildesk.shop" style={{color:C.pinkDark,textDecoration:"none",fontWeight:600}}>{tr("demoBannerGetOwn")}</a></span>
        {langToggle}
      </div>
      <div style={{display:"flex",flex:1}}>
        <AppSidebar screen={screen} setScreen={setScreen} lang={lang}/>
        <div style={{flex:1,padding:"20px 18px",overflowY:"auto"}}>
          {content}
        </div>
      </div>
      <div style={{padding:"10px",textAlign:"center",background:C.card,borderTop:`1px solid ${C.border}`,flexShrink:0}}>
        <span style={{fontSize:10,color:C.mute}}>{tr("footerText")}</span>
      </div>
    </div>
  );
}
