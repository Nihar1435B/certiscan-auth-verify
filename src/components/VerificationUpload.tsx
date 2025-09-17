import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function VerificationUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'valid' | 'invalid' | null;
    details?: string;
  }>({ status: null });
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    name?: string;
    certificateId?: string;
    course?: string;
  }>({});

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Please upload only PDF, JPG, PNG, or DOC files.');
        return;
      }
      
      // Validate file size (2MB limit)
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB.');
        return;
      }
      
      setFile(selectedFile);
      setVerificationResult({ status: null });
      setExtractedData({});
    }
  }, []);

  const handleVerification = async () => {
    if (!file) return;
    
    setLoading(true);
    
    // Simulate OCR extraction and verification process
    setTimeout(() => {
      // Mock extracted data
      const mockData = {
        name: "John Doe",
        certificateId: "CERT-2024-001",
        course: "Computer Science"
      };
      setExtractedData(mockData);
      
      // Mock verification result
      const isValid = Math.random() > 0.3; // 70% chance of being valid
      setVerificationResult({
        status: isValid ? 'valid' : 'invalid',
        details: isValid 
          ? 'Certificate found in organization database and verified successfully.' 
          : 'Certificate not found in organization database or details do not match.'
      });
      
      setLoading(false);
    }, 3000);
  };

  const resetForm = () => {
    setFile(null);
    setVerificationResult({ status: null });
    setExtractedData({});
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Certificate Verification</span>
          </CardTitle>
          <CardDescription>
            Upload a certificate to verify its authenticity against your organization's database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="certificate">Select Certificate File</Label>
            <Input
              id="certificate"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, JPG, PNG, DOC (Max size: 2MB)
            </p>
          </div>

          {/* File Info */}
          {file && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </AlertDescription>
            </Alert>
          )}

          {/* Verification Button */}
          <div className="flex space-x-2">
            <Button 
              onClick={handleVerification} 
              disabled={!file || loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Certificate
                </>
              )}
            </Button>
            
            {(file || verificationResult.status) && (
              <Button variant="outline" onClick={resetForm} disabled={loading}>
                Reset
              </Button>
            )}
          </div>

          {/* Extracted Data */}
          {extractedData.name && (
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-base">Extracted Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{extractedData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Certificate ID</Label>
                    <p className="text-sm text-muted-foreground">{extractedData.certificateId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Course</Label>
                    <p className="text-sm text-muted-foreground">{extractedData.course}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification Result */}
          {verificationResult.status && (
            <Alert className={verificationResult.status === 'valid' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
              {verificationResult.status === 'valid' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={verificationResult.status === 'valid' ? 'default' : 'destructive'}
                      className={verificationResult.status === 'valid' ? 'bg-green-600' : ''}
                    >
                      {verificationResult.status === 'valid' ? 'VALID' : 'INVALID'}
                    </Badge>
                    <span className="font-medium">
                      Certificate {verificationResult.status === 'valid' ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{verificationResult.details}</p>
                </div>
                
                {verificationResult.status === 'invalid' && (
                  <Button variant="outline" size="sm">
                    Send Alert Email
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}