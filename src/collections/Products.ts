import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'status', 'updatedAt'], // จัดคอลัมน์ในหน้า Admin ให้ดูง่าย
  },
  access: {
    read: () => true, // เปิดให้ทุกคนดูข้อมูลสินค้าได้ (Public)
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // ✅ รองรับ 2 ภาษา
      label: 'ชื่อสินค้า (Name)',
    },
    {
      name: 'slug', 
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar', // ย้ายไปอยู่ด้านขวา ไม่รกหน้าจอ
        description: 'URL ภาษาอังกฤษ ห้ามเว้นวรรค ',
      },
      label: 'Slug (URL)',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'ราคา (THB)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'instock',
      options: [
        { label: 'พร้อมส่ง (In Stock)', value: 'instock' },
        { label: 'สินค้าหมด (Out of Stock)', value: 'outofstock' },
        { label: 'พรีออเดอร์ (Pre-order)', value: 'preorder' },
      ],
      admin: {
        position: 'sidebar',
      },
      label: 'สถานะสินค้า',
    },
    {
      name: 'carModel',
      type: 'text',
      localized: true, 
      label: '',
      admin: {
        description: '',
      }
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true, // ✅ เพิ่มคำอธิบาย 2 ภาษา
      label: 'รายละเอียดสินค้า (Description)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพหลัก (Cover Image)',
    },
    // 👇 แก้ไขตรงนี้ครับ
    {
      name: 'gallery',
      type: 'relationship', // เปลี่ยนจาก array เป็น relationship
      relationTo: 'media',  // เชื่อมไปหา collection 'media'
      hasMany: true,        // ✅ สำคัญ! ตัวนี้ทำให้เลือกได้หลายรูปพร้อมกัน
      label: 'อัลบั้มรูปเพิ่มเติม (Gallery)',
      admin: {
        description: 'สามารถเลือกได้หลายรูปพร้อมกัน',
      }
    },
  ],
}