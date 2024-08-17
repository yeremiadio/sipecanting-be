import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            email: 'sipecanting@gmail.com',
            password: await bcrypt.hash("password", 10),
        },
    });
    await prisma.userDetail.create({
        data: {
            userId: user1.id,
            fullName: "Si Pecanting Admin",
            shortName: "Si Pecanting Admin",
            age: 24,
            phoneNumber: "123456789"
        },
    });

    // Seed posts
    await prisma.category.createMany({
        data: [
            { name: 'Pangan Lokal' },
            { name: 'Kesehatan' },
            { name: 'Perawatan' },
            { name: 'Edukasi' },
        ],
    });

    const sanitizedArticleList = [
        {
            title: 'Cegah Stunting Dengan Konsumsi Pangan Lokal',
            categoryId: 1,
            content:
                'Untuk mencegah dan mengatasi masalah gizi salah satunya dengan meningkatkan konsumsi pangan lokal. Kandungan gizi seimbang bisa didapatkan dari pangan yang banyak beredar di masyarakat. "Pangan lokal tidak hanya dari karbohidrat aja tapi bisa juga dari seafood, karena tidak ada batasan bawasannya gizi itu dari daging saja,"ungkap Kabid Konsumsi dan Keamanan Pangan DPTPH Prov Kaltim, Rika Nuzli Furkanti pada kegiatan cegah stunting dengan  pangan lokal, Jumat (18/8). Pangan lokal dapat menjadi menu dapur sehat atasi stunting.\n\nApalagi diketahui jika pangan lokal adalah sumber kebutuhan gizi ibu dan anak. Rika menerangkan gizi seimbang terdiri dari karbohidrat, protei, vitamin, mineral dan bisa dari pangan lokal seperti ubi, singkong dan jagung. "Lalu sayur sendiri bisa diolah menggunakan tepung mocaf dibuat seperti gorengan,"katanya. Selain  itu, meningkatkan gizi pihaknya telah melakukan festival pangan dengan mengenalkan pangan lokal untuk mencegah stunting. Mencegah adanya stunting sejak dini masyarakat dapat memperbanyak konsumsi makanan yang berasal dari pangan lokal yang kaya akan gizi.',
            thumbnailImage: null,
            caption: 'Interverensi Spesifik',
            authorId: user1.id,
        },
        {
            title: 'Meningkatkan Nutrisi Ibu untuk Mencegah Stunting pada Anak',
            categoryId: 2,
            content:
                'Stunting pada anak dimulai jauh sebelum mereka lahir. Memastikan bahwa ibu menerima nutrisi yang cukup sangat penting dalam memerangi stunting. Nutrisi yang tepat sebelum dan selama kehamilan, termasuk asupan vitamin dan mineral esensial, dapat secara signifikan memengaruhi perkembangan dan pertumbuhan janin. \n\nKunjungan rutin perawatan prenatal memungkinkan penyedia layanan kesehatan memantau kesehatan ibu dan bayi, serta memberikan intervensi yang diperlukan pada waktunya. Program kesehatan masyarakat yang menawarkan pendidikan nutrisi dan suplemen kepada ibu hamil sangat penting untuk memastikan bahwa baik ibu maupun anak menerima nutrisi yang mereka butuhkan untuk berkembang. \n\nDengan memprioritaskan kesehatan dan nutrisi ibu, kita dapat mengambil langkah pertama dalam mencegah stunting dan mempromosikan pertumbuhan yang sehat sejak awal.',
            thumbnailImage: null,
            caption: 'Interverensi Spesifik',
            authorId: user1.id,
        },
        {
            title: 'Air Bersih dan Kebersihan: Kunci untuk Mencegah Stunting pada Anak',
            categoryId: 2,
            content:
                'Akses ke air bersih dan praktik kebersihan yang baik sangat penting dalam mencegah stunting pada anak. Air yang terkontaminasi dan sanitasi yang buruk dapat menyebabkan infeksi dan penyakit berulang, seperti diare, yang menghambat penyerapan nutrisi dan pertumbuhan. \n\nMemberikan akses air minum bersih, fasilitas sanitasi yang lebih baik, dan pendidikan tentang praktik kebersihan yang baik, seperti mencuci tangan dengan sabun, kepada masyarakat dapat secara signifikan mengurangi prevalensi infeksi ini. Inisiatif kesehatan masyarakat yang fokus pada air, sanitasi, dan kebersihan (WASH) merupakan komponen penting dari strategi komprehensif untuk memerangi stunting. \n\nDengan memastikan bahwa anak-anak tumbuh di lingkungan yang bersih dan sehat, kita dapat membantu mereka mencapai potensi penuh mereka.',
            thumbnailImage: null,
            caption: 'Interverensi Spesifik',
            authorId: user1.id,
        },
        {
            title: 'Pengobatan Infeksi dan Penyakit pada Anak',
            categoryId: 3,
            content:
                'Pengobatan infeksi dan penyakit secara cepat dan efektif adalah langkah penting dalam mencegah stunting pada anak. Penyakit seperti diare, pneumonia, dan malaria dapat mengganggu penyerapan nutrisi dan menyebabkan penurunan berat badan yang signifikan. Pemberian antibiotik yang tepat, vaksinasi, dan perawatan medis yang cepat dapat membantu mengatasi masalah ini. \n\nSelain itu, pemantauan rutin pertumbuhan dan perkembangan anak memungkinkan identifikasi dini masalah kesehatan yang dapat diintervensi segera. Dengan menangani infeksi dan penyakit secara efisien, kita dapat memastikan anak-anak tetap sehat dan tumbuh optimal.',
            thumbnailImage:
                'https://www.who.int/images/default-source/wpro/countries/viet-nam/health-topics/vaccines.jpg?sfvrsn=89a81d7f_14',
            caption: 'Intervensi Sensitif',
            authorId: user1.id,
        },
        {
            title: 'Peningkatan Gizi melalui Suplemen Mikronutrien',
            categoryId: 3,
            content:
                'Suplemen mikronutrien adalah alat penting dalam mencegah stunting, terutama di daerah yang kekurangan gizi. Pemberian suplemen seperti zat besi, vitamin A, dan seng dapat membantu mengatasi defisiensi gizi yang sering terjadi pada anak-anak. Program suplementasi yang dijalankan oleh pemerintah dan organisasi kesehatan dapat meningkatkan status gizi anak-anak, sehingga mendukung pertumbuhan dan perkembangan yang sehat. \n\nPemberian suplemen ini harus diikuti dengan edukasi kepada orang tua tentang pentingnya mikronutrien dalam diet sehari-hari untuk memastikan pemahaman dan kepatuhan yang lebih baik.',
            thumbnailImage:
                'https://otcdigest.id/sites/default/files/5%20Mikronutrien%20yang%20Wajib%20Dikonsumsi%20Ibu%20Hamil.jpg',
            caption: 'Intervensi Sensitif',
            authorId: user1.id,
        },
        {
            title: 'Program Edukasi dan Penyuluhan Gizi di Komunitas',
            categoryId: 4,
            content:
                'Edukasi dan penyuluhan gizi di komunitas adalah intervensi sensitif yang efektif dalam mencegah stunting. Program ini berfokus pada meningkatkan pengetahuan dan kesadaran orang tua dan pengasuh tentang pentingnya gizi yang baik untuk pertumbuhan anak. Melalui sesi edukasi, demonstrasi memasak, dan konseling pribadi, masyarakat dapat belajar tentang sumber makanan bergizi, cara memasak yang sehat, dan pentingnya menjaga kebersihan. \n\nProgram ini juga sering kali melibatkan kader kesehatan lokal yang dapat memberikan dukungan berkelanjutan kepada keluarga di komunitas mereka. Dengan meningkatkan literasi gizi, kita dapat membantu orang tua membuat pilihan yang lebih baik untuk kesehatan dan pertumbuhan anak-anak mereka.',
            thumbnailImage:
                'https://asset.kompas.com/crops/dA1JTRLY0vFbvtG_GqdV1eEsslo=/0x0:0x0/750x500/data/photo/2017/01/30/0608357kelas-ibu-hamil-OKI780x390.jpg',
            caption: 'Intervensi Sensitif',
            authorId: user1.id,
        },
    ];

    await prisma.article.createMany({
        data: sanitizedArticleList,
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
