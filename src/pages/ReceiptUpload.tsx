import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  MoreVertical,
  Eye,
  Download,
  Trash,
  Receipt,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";

// Define interfaces for receipt items
interface ReceiptItem {
  name: string;
  price: number;
  quantity?: number;
}

interface DetailedReceipt {
  id: number;
  name: string;
  date: string;
  amount: number;
  status: string;
  category: string;
  vendor?: string;
  items?: ReceiptItem[];
  taxAmount?: number;
  subtotal?: number;
  imageUrl?: string;
}

const ReceiptUpload = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<DetailedReceipt | null>(null);
  
  // Sample data for uploaded receipts with more detailed information
  const uploadedReceipts: DetailedReceipt[] = [
    { 
      id: 1, 
      name: "Grocery Receipt", 
      date: "2024-04-07", 
      amount: 1078.45, 
      status: "processed", 
      category: "Food",
      vendor: "SuperMart Groceries",
      items: [
        { name: "Fruits & Vegetables", price: 320.50, quantity: 1 },
        { name: "Bread & Bakery", price: 150.95, quantity: 2 },
        { name: "Dairy Products", price: 280.00, quantity: 1 },
        { name: "Meat & Poultry", price: 275.00, quantity: 1 },
      ],
      subtotal: 1026.45,
      taxAmount: 52.00,
      imageUrl: "https://img.freepik.com/free-vector/receipt-template-collection-with-realistic-design_23-2147915328.jpg"
    },
    { 
      id: 2, 
      name: "Gas Station", 
      date: "2024-04-05", 
      amount: 1245.23, 
      status: "processed", 
      category: "Transportation",
      vendor: "QuickFuel Station",
      items: [
        { name: "Petrol (15L)", price: 1200.00, quantity: 1 },
        { name: "Car Wash", price: 45.23, quantity: 1 },
      ],
      subtotal: 1245.23,
      taxAmount: 0,
      imageUrl: "https://img.freepik.com/free-vector/fuel-expenses-receipt-petrol-bill-paper-invoice-document-isolated-white-background-isometric-tank-truck-gasoline-price-calculation-statement-form-3d-vector-illustration-fuel-receipt_1071-1203.jpg"
    },
    { id: 3, name: "Restaurant Bill", date: "2024-04-02", amount: 1267.89, status: "pending", category: "Dining" },
    { id: 4, name: "Office Supplies", date: "2024-03-28", amount: 2124.56, status: "processed", category: "Office" },
  ];
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };
  
  const handleFile = (files: FileList) => {
    toast.success(`Receipt ${files[0].name} uploaded and being processed`);
    
    // Simulate AI-based receipt analysis with a loading state
    const loadingToast = toast.loading("Analyzing receipt...");
    
    // In a real app, this would be an API call to a receipt OCR service
    setTimeout(() => {
      toast.dismiss(loadingToast);
      
      // Sample detected data from receipt
      const detectedData = {
        vendor: files[0].name.includes("Grocery") ? "SuperMart Groceries" : 
               files[0].name.includes("Gas") ? "QuickFuel Station" : 
               "Merchant " + Math.floor(Math.random() * 100),
        date: new Date().toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 2000) + 100,
        items: [
          { name: "Item 1", price: Math.floor(Math.random() * 500) + 10 },
          { name: "Item 2", price: Math.floor(Math.random() * 300) + 20 },
          { name: "Item 3", price: Math.floor(Math.random() * 200) + 30 },
        ],
        taxAmount: Math.floor(Math.random() * 100) + 10,
        category: files[0].name.includes("Grocery") ? "Food" : 
                  files[0].name.includes("Gas") ? "Transportation" : 
                  "Miscellaneous"
      };
      
      // Show detailed analysis
      toast.success(
        <div className="space-y-2">
          <h3 className="font-bold">Receipt Analysis Complete</h3>
          <div className="text-sm">
            <p><span className="font-medium">Vendor:</span> {detectedData.vendor}</p>
            <p><span className="font-medium">Date:</span> {detectedData.date}</p>
            <p><span className="font-medium">Amount:</span> ₹{detectedData.amount.toFixed(2)}</p>
            <p><span className="font-medium">Category:</span> {detectedData.category}</p>
          </div>
        </div>,
        {
          duration: 5000,
        }
      );
      
      // Automatically switch to the library tab to show the newly added receipt
      setActiveTab("library");
      
      // In a real app, we would add the receipt to the list and save it to the database
    }, 2000);
  };
  
  const handleViewReceipt = (id: number) => {
    const receipt = uploadedReceipts.find(r => r.id === id);
    if (receipt) {
      setViewingReceipt(receipt);
    } else {
      toast.info(`Viewing receipt ${id}`);
    }
  };
  
  const handleDownloadReceipt = (id: number) => {
    toast.success(`Receipt ${id} downloaded`);
  };
  
  const handleDeleteReceipt = (id: number) => {
    toast.success(`Receipt ${id} deleted`);
  };
  
  const handleScanReceipt = () => {
    toast.info("Opening camera...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('receipt_upload')}</h1>
          <p className="text-muted-foreground">
            {t('upload_and_manage_receipts')}
          </p>
        </div>

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">{t('upload')}</TabsTrigger>
            <TabsTrigger value="library">{t('receipt_library')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('upload_receipt')}</CardTitle>
                <CardDescription>
                  {t('drag_and_drop_receipt_or_take_photo')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
                    dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("receipt-upload")?.click()}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-medium">{t('drop_files_here')}</p>
                      <p className="text-sm text-muted-foreground">{t('or_click_to_browse')}</p>
                      <p className="text-xs text-muted-foreground">{t('supported_formats')}</p>
                    </div>
                  </div>
                  <input 
                    id="receipt-upload" 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, application/pdf" 
                    className="hidden" 
                    onChange={handleChange}
                    multiple
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{t('or')}</p>
                  <Button onClick={handleScanReceipt}>
                    <Image className="mr-2 h-4 w-4" />
                    {t('take_photo_of_receipt')}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt-category">{t('assign_to_category')}</Label>
                  <Select>
                    <SelectTrigger id="receipt-category">
                      <SelectValue placeholder={t('select_category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">{t('food')}</SelectItem>
                      <SelectItem value="Transportation">{t('transportation')}</SelectItem>
                      <SelectItem value="Housing">{t('housing')}</SelectItem>
                      <SelectItem value="Utilities">{t('utilities')}</SelectItem>
                      <SelectItem value="Entertainment">{t('entertainment')}</SelectItem>
                      <SelectItem value="Healthcare">{t('healthcare')}</SelectItem>
                      <SelectItem value="Office">{t('office')}</SelectItem>
                      <SelectItem value="Other">{t('other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt-notes">{t('notes')}</Label>
                  <Input id="receipt-notes" placeholder={t('add_notes_about_this_receipt')} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="library" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('receipt_library')}</CardTitle>
                <CardDescription>
                  {t('view_and_manage_all_uploaded_receipts')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('receipt')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedReceipts.map((receipt) => (
                      <TableRow key={receipt.id}>
                        <TableCell className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {receipt.name}
                        </TableCell>
                        <TableCell>{receipt.date}</TableCell>
                        <TableCell>₹{receipt.amount.toFixed(2)}</TableCell>
                        <TableCell>{receipt.category}</TableCell>
                        <TableCell>
                          {receipt.status === "processed" ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              {t('processed')}
                            </span>
                          ) : (
                            <span className="text-yellow-600">{t('pending')}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewReceipt(receipt.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                {t('view')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadReceipt(receipt.id)}>
                                <Download className="mr-2 h-4 w-4" />
                                {t('download')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteReceipt(receipt.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                {t('delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Receipt Detail Dialog */}
        <Dialog open={!!viewingReceipt} onOpenChange={(open) => !open && setViewingReceipt(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {viewingReceipt && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    {viewingReceipt.name}
                  </DialogTitle>
                  <DialogDescription>
                    {viewingReceipt.date} • {viewingReceipt.vendor || 'Unknown Vendor'}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Receipt Image */}
                  <div className="bg-muted/20 rounded-lg p-4 flex items-center justify-center">
                    {viewingReceipt.imageUrl ? (
                      <img 
                        src={viewingReceipt.imageUrl} 
                        alt="Receipt" 
                        className="max-h-60 object-contain"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Receipt image not available</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Receipt Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                      <div className="flex items-center">
                        {viewingReceipt.status === "processed" ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="font-medium text-green-500">Processed</span>
                          </>
                        ) : (
                          <span className="font-medium text-yellow-500">Pending</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                      <p className="font-medium">{viewingReceipt.category}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Amount</h3>
                      <p className="text-xl font-bold">₹{viewingReceipt.amount.toFixed(2)}</p>
                    </div>
                    
                    {viewingReceipt.items && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">OCR Recognition Confidence</h3>
                        <Progress value={85} className="h-2 mb-1" />
                        <p className="text-xs text-muted-foreground">85% confident in extracted data</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Item Details */}
                {viewingReceipt.items && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium">Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingReceipt.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        {viewingReceipt.subtotal && (
                          <TableRow>
                            <TableCell className="font-medium">Subtotal</TableCell>
                            <TableCell className="text-right font-medium">₹{viewingReceipt.subtotal.toFixed(2)}</TableCell>
                          </TableRow>
                        )}
                        {viewingReceipt.taxAmount !== undefined && viewingReceipt.taxAmount > 0 && (
                          <TableRow>
                            <TableCell className="font-medium">Tax</TableCell>
                            <TableCell className="text-right font-medium">₹{viewingReceipt.taxAmount.toFixed(2)}</TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell className="font-bold">Total</TableCell>
                          <TableCell className="text-right font-bold">₹{viewingReceipt.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => handleDownloadReceipt(viewingReceipt.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setViewingReceipt(null);
                      toast.success("Receipt added to transactions");
                    }}
                  >
                    Add to Transactions
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ReceiptUpload;
