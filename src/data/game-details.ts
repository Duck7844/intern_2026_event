import type { Step } from "@/data/faq";
import { type Game, games, getGame } from "@/data/games";

/**
 * Nội dung trang chi tiết /tro-choi/[slug]. Chỉ 10 game kind="detail" có bản ghi ở đây.
 * Text viết bằng lời của dự án. Trường `image` để trống thì trang dùng ô pastel + icon.
 */

export type GameMode = {
  title: string;
  description: string;
  /** play: chơi thử ngay; room: tạo phòng cho sự kiện */
  action: "play" | "room";
};

export type UseCase = { title: string; description: string };

export type GameDetail = {
  slug: string;
  /** Nhãn loại game trên badge đầu trang */
  kind: string;
  longDescription: string;
  difficulty: string;
  modes: [GameMode, GameMode];
  steps: [Step, Step, Step];
  suitableFor: string[];
  tip: string;
  useCases: UseCase[];
  /** slug của 4 game gợi ý */
  related: string[];
  /** Ảnh hero riêng (đường dẫn trong public), mặc định dùng game.image */
  image?: string;
};

const modeDefault = (playDesc: string, roomDesc: string): [GameMode, GameMode] => [
  { title: "Chơi ngay", description: playDesc, action: "play" },
  { title: "Tạo phòng cho sự kiện", description: roomDesc, action: "room" },
];

export const gameDetails: GameDetail[] = [
  {
    slug: "do-vui-trac-nghiem",
    kind: "Realtime · QR",
    longDescription:
      "Câu hỏi hiện trên màn chiếu, mọi người chọn 1 trong 4 đáp án trên điện thoại. Trả lời đúng và nhanh được nhiều điểm, bảng xếp hạng đổi sau mỗi câu. Doanh nghiệp dùng để khởi động Year End Party, ôn lại kiến thức sau buổi đào tạo sản phẩm hay hỏi đáp về thương hiệu ở hội nghị khách hàng. Bạn tự dán bộ câu hỏi hoặc dùng bộ mẫu có sẵn.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Chơi trọn một ván ngay trên máy của bạn, đua điểm với người chơi ảo, xem tổng kết và chơi lại bao nhiêu lần cũng được.",
      "Tạo phòng 3 bước: dán nội dung, chọn luật, nhận QR/PIN. Mọi người quét bằng điện thoại là vào. Miễn phí tới 20 người.",
    ),
    steps: [
      { title: "Host mở phòng", description: "Chọn bộ câu hỏi mẫu, chiếu màn hình có QR và mã PIN.", icon: "phone-qr", tone: "peri" },
      { title: "Quét QR, nhập tên", description: "Người chơi vào phòng bằng điện thoại, không cần cài app.", icon: "ava-fox", tone: "mint" },
      { title: "Trả lời trong 20 giây", description: "Bấm 1 trong 4 ô màu. Đúng tối đa 1.000 điểm, càng nhanh càng nhiều.", icon: "timer", tone: "yellow" },
    ],
    suitableFor: ["Year End Party", "Hội nghị khách hàng", "Đào tạo sản phẩm", "Onboarding nhân viên", "Workshop"],
    tip: "10 câu là vừa cho 10 phút khởi động. Trộn vài câu vui với câu hỏi về lịch sử, sản phẩm công ty để vừa chơi vừa truyền thông nội bộ.",
    useCases: [
      { title: "Year End Party", description: "Khởi động cả hội trường bằng câu hỏi về một năm của công ty." },
      { title: "Hội nghị khách hàng", description: "Lồng câu hỏi về sản phẩm để khách nhớ thông điệp lâu hơn." },
      { title: "Đào tạo nội bộ", description: "Kiểm tra nhanh sau buổi học, biết ngay phần nào cần ôn lại." },
      { title: "Onboarding", description: "Nhân viên mới làm quen lịch sử, giá trị và quy trình công ty." },
      { title: "Workshop", description: "Mở đầu buổi làm việc bằng vài câu hỏi đúng chủ đề." },
    ],
    related: ["duoi-hinh-bat-chu", "word-cloud", "vong-quay", "doan-gia"],
  },
  {
    slug: "duoi-hinh-bat-chu",
    kind: "Realtime · QR",
    longDescription:
      "Một hình ghép hiện trên màn chiếu, cả phòng đoán cụm từ ẩn sau đó và gõ đáp án trên điện thoại. Ai gõ đúng sớm nhất được nhiều điểm nhất. Phù hợp để cả hội trường cùng cười, và doanh nghiệp có thể tự làm câu đố riêng về tên sản phẩm, slogan hay giá trị cốt lõi.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Chơi thử với bộ câu đố mẫu ngay trên máy, không cần tài khoản.",
      "Dán bộ hình và đáp án của bạn, nhận QR/PIN và chiếu lên màn lớn. Miễn phí tới 20 người.",
    ),
    steps: [
      { title: "Chiếu hình ghép", description: "Host bấm hiện hình, đồng hồ đếm ngược bắt đầu.", icon: "picture-word", tone: "mint" },
      { title: "Gõ đáp án", description: "Người chơi gõ cụm từ đoán được trên điện thoại, không phân biệt hoa thường.", icon: "phone-qr", tone: "peri" },
      { title: "Công bố và xếp hạng", description: "Đáp án đúng hiện lên, điểm cộng theo tốc độ, bảng xếp hạng cập nhật.", icon: "trophy", tone: "yellow" },
    ],
    suitableFor: ["Team building", "Year End Party", "Tiệc phòng ban", "Nhóm bạn"],
    tip: "Xen kẽ câu dễ và câu khó, để câu về thương hiệu ở giữa ván khi mọi người đã nóng máy.",
    useCases: [
      { title: "Team building", description: "Đoán tên đồng nghiệp, phòng ban hay kỷ niệm chung của công ty." },
      { title: "Ra mắt sản phẩm", description: "Giấu tên sản phẩm mới trong hình ghép để khách tự khám phá." },
      { title: "Year End Party", description: "Nhìn lại một năm qua những sự kiện được mã hoá thành hình." },
      { title: "Nhóm bạn", description: "Chơi nhanh vài câu lúc chờ đồ ăn, không cần chuẩn bị." },
    ],
    related: ["do-vui-trac-nghiem", "ve-va-doan", "word-cloud", "tim-diem-khac-nhau"],
  },
  {
    slug: "doan-gia",
    kind: "Realtime · QR",
    longDescription:
      "Chiếu ảnh một sản phẩm thật, người chơi nhập mức giá họ nghĩ là đúng trên điện thoại. Ai đoán gần nhất ghi điểm cao nhất. Cách nhẹ nhàng để khách hàng nhớ sản phẩm và mức giá, đồng thời tạo tiếng cười khi có người đoán lệch xa.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Chơi thử với bộ sản phẩm mẫu, xem cách tính điểm theo độ lệch.",
      "Tải ảnh và giá sản phẩm của bạn, chọn số vòng và nhận QR/PIN cho khách.",
    ),
    steps: [
      { title: "Chiếu sản phẩm", description: "Ảnh và tên sản phẩm hiện trên màn lớn, giá được giấu.", icon: "price", tone: "yellow" },
      { title: "Nhập giá đoán", description: "Mỗi người nhập một con số trên điện thoại trong thời gian quy định.", icon: "phone-qr", tone: "peri" },
      { title: "Lật giá thật", description: "Giá thật hiện ra, điểm tính theo độ gần, top 3 được tô sáng.", icon: "trophy", tone: "peach" },
    ],
    suitableFor: ["Hội nghị khách hàng", "Gala", "Ra mắt sản phẩm", "Booth sự kiện"],
    tip: "Chọn 5 đến 8 sản phẩm có mức giá chênh lệch rõ để trò chơi có nhịp lên xuống.",
    useCases: [
      { title: "Hội nghị khách hàng", description: "Khách nhớ giá và điểm khác biệt của từng dòng sản phẩm." },
      { title: "Gala", description: "Xen giữa các tiết mục, 5 phút là xong một ván." },
      { title: "Ra mắt sản phẩm", description: "Tạo hồi hộp trước khi công bố giá chính thức." },
      { title: "Booth sự kiện", description: "Khách dừng chân chơi một vòng, nhận quà nếu đoán đúng." },
    ],
    related: ["do-vui-trac-nghiem", "binh-chon", "vong-quay", "bingo-su-kien"],
  },
  {
    slug: "binh-chon",
    kind: "Realtime · QR",
    longDescription:
      "Host đặt một câu hỏi, cả hội trường bấm chọn trên điện thoại và biểu đồ kết quả hiện ngay trên màn chiếu. Dùng để lấy ý kiến nhanh, bình chọn tiết mục hay đơn giản là làm nóng không khí đầu buổi. Hỗ trợ nhiều câu liên tiếp và ẩn kết quả tới khi host công bố.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Xem thử giao diện bình chọn và biểu đồ với dữ liệu mẫu.",
      "Soạn câu hỏi và các lựa chọn, chiếu QR để mọi người tham gia ngay.",
    ),
    steps: [
      { title: "Đặt câu hỏi", description: "Host nhập câu hỏi và 2 đến 6 lựa chọn, bấm Mở bình chọn.", icon: "vote", tone: "peri" },
      { title: "Mọi người bấm chọn", description: "Người chơi chọn một phương án trên điện thoại, có thể đổi ý trước khi đóng.", icon: "phone-qr", tone: "mint" },
      { title: "Hiện kết quả", description: "Biểu đồ cột hoặc tròn chạy trực tiếp trên màn chiếu.", icon: "chart", tone: "yellow" },
    ],
    suitableFor: ["Hội nghị", "Workshop", "Gala", "Họp toàn công ty"],
    tip: "Bật chế độ ẩn kết quả khi hỏi câu nhạy cảm, công bố cùng lúc để không ai bị ảnh hưởng bởi số đông.",
    useCases: [
      { title: "Hội nghị", description: "Khảo sát nhanh ý kiến khách mời về chủ đề đang trình bày." },
      { title: "Gala", description: "Bình chọn tiết mục hay nhất, kết quả minh bạch trên màn lớn." },
      { title: "Workshop", description: "Chọn chủ đề thảo luận tiếp theo theo số đông." },
      { title: "Họp toàn công ty", description: "Lấy ý kiến về chính sách mới ngay trong buổi họp." },
    ],
    related: ["word-cloud", "do-vui-trac-nghiem", "doan-gia", "bingo-su-kien"],
  },
  {
    slug: "word-cloud",
    kind: "Realtime · QR",
    longDescription:
      "Host đưa ra một câu hỏi mở, mỗi người gửi vài từ từ điện thoại. Từ nào được nhiều người chọn sẽ to dần trên màn chiếu, tạo thành đám mây từ khoá của cả phòng. Nhìn vào là thấy ngay mọi người đang nghĩ gì, rất hợp để mở đầu hoặc tổng kết một buổi.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Xem thử đám mây từ khoá với dữ liệu mẫu, thử gửi vài từ của bạn.",
      "Soạn câu hỏi, bật duyệt trước khi chiếu nếu cần, nhận QR/PIN.",
    ),
    steps: [
      { title: "Đặt câu hỏi mở", description: "Ví dụ: Một từ mô tả năm vừa qua của bạn?", icon: "word-cloud", tone: "pink" },
      { title: "Gửi từ khoá", description: "Mỗi người gửi tối đa 3 từ, bộ lọc tự chặn từ không phù hợp.", icon: "phone-qr", tone: "peri" },
      { title: "Đám mây lớn dần", description: "Từ trùng nhau to lên theo thời gian thực trên màn chiếu.", icon: "sparkles", tone: "mint" },
    ],
    suitableFor: ["Phá băng", "Hội nghị", "Workshop", "Tổng kết năm"],
    tip: "Hỏi câu ngắn và cụ thể. Câu quá rộng sẽ cho ra đám mây rời rạc, khó đọc.",
    useCases: [
      { title: "Phá băng", description: "Mở đầu buổi bằng câu hỏi vui để mọi người quen tay." },
      { title: "Tổng kết năm", description: "Mỗi người một từ về năm cũ, một từ kỳ vọng năm mới." },
      { title: "Workshop", description: "Thu thập ý tưởng hoặc vấn đề cần giải quyết trong 2 phút." },
      { title: "Hội nghị", description: "Khách nói lên ấn tượng về thương hiệu, hiện ngay trên LED." },
    ],
    related: ["binh-chon", "do-vui-trac-nghiem", "hai-su-that-mot-loi-noi-doi", "bingo-su-kien"],
  },
  {
    slug: "ai-la-gian-diep",
    kind: "Chuyền máy",
    longDescription:
      "Dân thường nhận cùng một từ, gián điệp nhận từ gần nghĩa, có thể thêm vai Mũ Trắng không có từ. Mỗi người lần lượt mô tả từ của mình thật khéo, rồi cả nhóm bỏ phiếu loại người đáng ngờ. Chỉ cần một điện thoại chuyền tay, không cần màn chiếu. Hợp nhóm nhỏ trong chuyến du lịch công ty, tiệc phòng ban hay buổi gắn kết thành viên mới.",
    difficulty: "Vừa",
    modes: [
      { title: "Đấu với máy", description: "Bạn và 5 người chơi ảo, ai cũng mô tả từ của mình. Tìm ra gián điệp trước khi quá muộn!", action: "play" },
      { title: "Chơi cùng bạn bè (chuyền 1 máy)", description: "Nhập tên 4 đến 12 người, chuyền điện thoại để xem từ bí mật rồi cùng bỏ phiếu.", action: "room" },
    ],
    steps: [
      { title: "Chia vai bí mật", description: "Chuyền máy, mỗi người chạm để xem từ của mình rồi ẩn đi.", icon: "spy", tone: "lilac" },
      { title: "Mô tả", description: "Mỗi người nói một từ hoặc cụm từ mô tả, không nói thẳng từ khoá.", icon: "mic", tone: "peach" },
      { title: "Bỏ phiếu", description: "Cả nhóm chọn 1 người để loại, người bị loại lộ vai.", icon: "vote", tone: "mint" },
    ],
    suitableFor: ["Team building nhỏ", "Du lịch công ty", "Tiệc phòng ban", "Nhóm bạn"],
    tip: "6 đến 8 người là vui nhất. Lần đầu nên tắt vai Mũ Trắng cho dễ hiểu luật.",
    useCases: [
      { title: "Du lịch công ty", description: "Chơi trên xe hay ở resort chỉ với một điện thoại." },
      { title: "Tiệc phòng ban", description: "Nhóm nhỏ ngồi quanh bàn, ai cũng phải lên tiếng." },
      { title: "Gắn kết thành viên mới", description: "Nói, nghe và đoán ý nhau giúp người mới hoà nhập nhanh." },
      { title: "Giờ nghỉ", description: "Một ván 10 đến 20 phút, không cần chuẩn bị gì." },
    ],
    related: ["duoi-hinh-bat-chu", "do-vui-trac-nghiem", "word-cloud", "vong-quay"],
  },
  {
    slug: "bingo-su-kien",
    kind: "Realtime · QR",
    longDescription:
      "Mỗi người nhận một bảng ô vuông với các gợi ý kiểu “Tìm người đã từng…”. Đi quanh hội trường, trò chuyện để tìm người phù hợp và đánh dấu ô. Ai hoàn thành một hàng trước thì bingo. Trò chơi ép mọi người phải bắt chuyện, hợp networking và buổi có nhiều người mới.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Xem thử bảng bingo mẫu và cách đánh dấu ô trên điện thoại.",
      "Soạn danh sách gợi ý theo công ty bạn, nhận QR/PIN cho khách.",
    ),
    steps: [
      { title: "Nhận bảng", description: "Quét QR, mỗi người nhận một bảng gợi ý ngẫu nhiên.", icon: "bingo", tone: "yellow" },
      { title: "Đi tìm người", description: "Trò chuyện, tìm người khớp gợi ý rồi nhập tên họ vào ô.", icon: "users", tone: "peri" },
      { title: "Bingo", description: "Đủ một hàng là báo bingo, màn chiếu hiện tên người thắng.", icon: "trophy", tone: "mint" },
    ],
    suitableFor: ["Networking", "Year End Party", "Gala", "Onboarding"],
    tip: "Để 15 đến 20 phút cho vòng chơi và chuẩn bị quà cho 3 người bingo đầu tiên.",
    useCases: [
      { title: "Networking", description: "Khách phải bắt chuyện với ít nhất 9 người để hoàn thành bảng." },
      { title: "Year End Party", description: "Gợi ý về kỷ niệm trong năm để mọi người ôn lại chuyện cũ." },
      { title: "Onboarding", description: "Nhân viên mới làm quen đồng nghiệp qua từng ô gợi ý." },
      { title: "Gala", description: "Chơi trong lúc chờ chương trình bắt đầu, không cần sân khấu." },
    ],
    related: ["hai-su-that-mot-loi-noi-doi", "word-cloud", "do-vui-trac-nghiem", "vong-quay"],
  },
  {
    slug: "hai-su-that-mot-loi-noi-doi",
    kind: "Realtime · QR",
    longDescription:
      "Mỗi người kể 3 điều về bản thân, trong đó có 1 điều không đúng. Cả phòng đọc trên màn chiếu và bỏ phiếu xem câu nào là nói dối. Người đoán đúng được điểm, người kể được điểm nếu lừa được nhiều người. Cách nhanh để đồng nghiệp hiểu nhau hơn.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Xem thử một vòng với nhân vật mẫu, bỏ phiếu và xem kết quả.",
      "Mọi người tự nhập 3 câu từ điện thoại, host điều khiển thứ tự lên màn chiếu.",
    ),
    steps: [
      { title: "Nhập 3 câu", description: "Mỗi người gõ 2 sự thật và 1 lời nói dối trên điện thoại.", icon: "two-truths", tone: "peach" },
      { title: "Lên màn chiếu", description: "Host chọn một người, 3 câu hiện lên để cả phòng đọc.", icon: "phone-qr", tone: "peri" },
      { title: "Bỏ phiếu và lật", description: "Mọi người bỏ phiếu, câu nói dối được lật ra kèm tỷ lệ đoán đúng.", icon: "vote", tone: "yellow" },
    ],
    suitableFor: ["Phá băng", "Nhóm bạn", "Tiệc phòng ban", "Onboarding"],
    tip: "Nhóm 10 đến 15 người là vừa. Nhóm lớn hơn nên chọn ngẫu nhiên vài người để giữ nhịp.",
    useCases: [
      { title: "Phá băng", description: "Mở đầu buổi team building, ai cũng được kể về mình." },
      { title: "Onboarding", description: "Nhân viên mới giới thiệu bản thân theo cách vui hơn." },
      { title: "Tiệc phòng ban", description: "Khám phá những điều bất ngờ về đồng nghiệp lâu năm." },
      { title: "Nhóm bạn", description: "Chơi khi tụ tập, không cần chuẩn bị trước." },
    ],
    related: ["ai-la-gian-diep", "word-cloud", "bingo-su-kien", "ve-va-doan"],
  },
  {
    slug: "ve-va-doan",
    kind: "Realtime · QR",
    longDescription:
      "Một người nhận từ khoá bí mật và vẽ trên điện thoại, nét vẽ hiện trực tiếp lên màn chiếu. Những người còn lại gõ đáp án, ai đoán đúng sớm nhất được điểm, người vẽ cũng được điểm khi có người đoán ra. Vui cho team nhỏ và tiệc phòng ban, không cần ai vẽ đẹp.",
    difficulty: "Dễ",
    modes: modeDefault(
      "Thử vẽ và xem nét vẽ hiện lên màn hình với từ khoá mẫu.",
      "Chọn bộ từ khoá, số vòng và thời gian vẽ, nhận QR/PIN cho nhóm.",
    ),
    steps: [
      { title: "Nhận từ khoá", description: "Người vẽ xem từ bí mật trên điện thoại của mình.", icon: "draw", tone: "sky" },
      { title: "Vẽ trong 60 giây", description: "Nét vẽ chạy trực tiếp lên màn chiếu, không được viết chữ.", icon: "timer", tone: "peach" },
      { title: "Đoán và ghi điểm", description: "Người đoán gõ đáp án, đúng sớm được nhiều điểm hơn.", icon: "trophy", tone: "yellow" },
    ],
    suitableFor: ["Team building", "Tiệc phòng ban", "Nhóm bạn", "Lớp học"],
    tip: "Bộ từ khoá về công ty (tên sản phẩm, phòng ban, sếp) luôn tạo tiếng cười nhiều nhất.",
    useCases: [
      { title: "Team building", description: "Chia đội, mỗi đội cử người vẽ, đội đoán đúng nhiều thắng." },
      { title: "Tiệc phòng ban", description: "Nhóm 5 đến 12 người quanh một màn hình TV." },
      { title: "Lớp học", description: "Ôn từ vựng hoặc khái niệm bằng hình vẽ." },
      { title: "Nhóm bạn", description: "Không cần giấy bút, chỉ cần điện thoại và một màn hình." },
    ],
    related: ["duoi-hinh-bat-chu", "hai-su-that-mot-loi-noi-doi", "ai-la-gian-diep", "tim-diem-khac-nhau"],
  },
  {
    slug: "tim-diem-khac-nhau",
    kind: "Miễn phí · thi đua theo phòng",
    longDescription:
      "Quan sát hai bức tranh gần giống nhau, chạm vào chỗ khác để ghi điểm. Bấm đúng được cộng điểm, bấm sai bị trừ, xong sớm có thưởng thời gian. Chơi miễn phí một mình hoặc thi đua cùng đồng nghiệp qua QR/PIN, bảng xếp hạng hiện trên màn chiếu. Khi tranh là ảnh sản phẩm, bao bì hay cửa hàng của bạn, người chơi sẽ nhìn kỹ từng chi tiết thay vì lướt qua.",
    difficulty: "Dễ đến khó",
    modes: modeDefault(
      "Vào thẳng màn chơi với bộ tranh mẫu, mở khoá màn tiếp theo khi hoàn thành.",
      "Tạo phòng thi đua 3 màn với bộ tranh của bạn, nhận link màn chiếu và lưu kết quả từng lượt.",
    ),
    steps: [
      { title: "Chọn màn", description: "Màn 1 mở sẵn, hoàn thành màn trước để mở màn sau.", icon: "spot-diff", tone: "mint" },
      { title: "Tìm điểm khác", description: "Chạm vào chỗ khác nhau ở một trong hai ảnh. Bấm sai bị trừ điểm, gợi ý trừ nhiều hơn.", icon: "phone-qr", tone: "peri" },
      { title: "Ghi điểm", description: "Tìm đủ trước khi hết giờ để nhận thưởng thời gian và tối đa 3 sao.", icon: "trophy", tone: "yellow" },
    ],
    suitableFor: ["Booth sự kiện", "Ra mắt sản phẩm", "Year End Party", "Hội nghị khách hàng", "Đào tạo nội bộ"],
    tip: "Tạo phòng thi đua 3 màn, chiếu bảng xếp hạng lên màn lớn trong lúc khách check-in, trao quà cho top 3. Bộ tranh riêng cần thời gian chuẩn bị nên liên hệ sớm.",
    useCases: [
      { title: "Booth sự kiện", description: "Thu hút khách dừng lại bằng tranh làm từ ảnh sản phẩm." },
      { title: "Ra mắt sản phẩm", description: "Khách khám phá chi tiết thiết kế, bao bì mới khi tìm điểm khác." },
      { title: "Year End Party", description: "Cả công ty thi đua, bảng xếp hạng hiện trên màn chiếu." },
      { title: "Hội nghị khách hàng", description: "Lồng ghép sản phẩm, dịch vụ vào phần giải trí giữa giờ." },
      { title: "Onboarding", description: "Nhân viên mới làm quen sản phẩm qua từng bức tranh." },
      { title: "Team building", description: "Dùng ảnh văn phòng, đồng nghiệp để cả nhóm cười với nhau." },
    ],
    related: ["duoi-hinh-bat-chu", "do-vui-trac-nghiem", "ai-la-gian-diep", "doan-gia"],
  },
];

export function getGameDetail(slug: string) {
  return gameDetails.find((d) => d.slug === slug);
}

/** Game + detail đã ghép, kèm danh sách game liên quan đã resolve. */
export function getGamePage(slug: string): { game: Game; detail: GameDetail; related: Game[] } | null {
  const game = getGame(slug);
  const detail = getGameDetail(slug);
  if (!game || !detail) return null;
  const related = detail.related.map((s) => getGame(s)).filter((g): g is Game => Boolean(g));
  return { game, detail, related };
}

/** Slug của mọi game có trang chi tiết (dùng cho generateStaticParams). */
export const detailSlugs = games.filter((g) => g.kind === "detail").map((g) => g.slug);
