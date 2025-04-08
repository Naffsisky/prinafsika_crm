<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Phoenix',
                'description' => 'Internet Up to 10 Mbps',
                'price' => 280000,
            ],
            [
                'name' => 'Streamix',
                'description' => 'Internet Up to 30 Mbps',
                'price' => 350000,
            ],
            [
                'name' => 'Megamix',
                'description' => 'Internet Up to 50 Mbps',
                'price' => 450000,
            ],
            [
                'name' => 'JITU 1',
                'description' => 'Internet Up to 100 Mbps',
                'price' => 500000,
            ],
            [
                'name' => 'JITU 2',
                'description' => 'Internet Up to 2 Gbps',
                'price' => 1000000,
            ],
            [
                'name' => 'JITU 3',
                'description' => 'Internet Up to 10 Gbps',
                'price' => 2000000,
            ],
            [
                'name' => 'Tv Plus',
                'description' => 'Tv all Local Channels',
                'price' => 100000,
            ],
            [
                'name' => 'Tv Premium',
                'description' => 'Tv Up to 50+ Channels',
                'price' => 200000,
            ],
            [
                'name' => 'Tv Ultimate',
                'description' => 'Tv Up to 100+ Channels',
                'price' => 300000,
            ],
            [
                'name' => 'Hemat 1',
                'description' => 'Internet Up to 10 Mbps',
                'price' => 50000,
            ],
            [
                'name' => 'Hemat 2',
                'description' => 'Internet Up to 500 Kbps',
                'price' => 40000,
            ],
            [
                'name' => 'Hemat 3',
                'description' => 'Internet Up to 100 Kbps',
                'price' => 20000,
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
