import {
  ArrowLeftOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Result,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoiceById } from "../../features/invoice/invoiceSlice";
import type { AppDispatch, RootState } from "../../store";
import { format } from "date-fns";

const { Title, Text } = Typography;

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { invoceDetail, loading } = useSelector(
    (state: RootState) => state.invoice
  );

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceById(id));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "green";
      case "partial":
        return "orange";
      case "unpaid":
        return "red";
      default:
        return "blue";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!invoceDetail || !invoceDetail.id) {
    return (
      <Result
        status="404"
        title="Invoice Not Found"
        subTitle="The invoice you're looking for doesn't exist."
        extra={
          <Button type="default" onClick={handleGoBack}>
            Go Back
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Col>
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              type="text"
            >
              Back
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              Invoice Details
            </Title>
          </Space>
        </Col>
        <Col>
          <Tag color="blue" style={{ fontSize: "14px", padding: "4px 12px" }}>
            {invoceDetail.status?.toUpperCase()}
          </Tag>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DollarOutlined />
            <span>Invoice Summary</span>
          </Space>
        }
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">Invoice Number</Text>
            <div>
              <Text strong style={{ fontSize: "16px" }}>
                {invoceDetail.invoiceNumber}
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">Total Amount</Text>
            <div>
              <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                €{invoceDetail.taxInclusiveAmount}
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">Issue Date</Text>
            <div>
              <Text strong>{formatDate(invoceDetail.issueDate)}</Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">Due Date</Text>
            <div>
              <Text strong>{formatDate(invoceDetail.dueDate)}</Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ShopOutlined />
                <span>Supplier Information</span>
              </Space>
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Company Name">
                <Text strong>{invoceDetail.supplierName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="VAT Number">
                {invoceDetail.supplierVat}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {invoceDetail.supplierCountryCode}
              </Descriptions.Item>
              <Descriptions.Item label="Endpoint">
                {invoceDetail.supplierEndpoint}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                <span>Customer Information</span>
              </Space>
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Customer Name">
                <Text strong>{invoceDetail.customerName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="VAT Number">
                {invoceDetail.customerVat}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {invoceDetail.customerCountryCode}
              </Descriptions.Item>
              <Descriptions.Item label="Endpoint">
                {invoceDetail.customerEndpoint || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DollarOutlined />
            <span>Financial Details</span>
          </Space>
        }
        style={{ marginTop: "24px" }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Line Extension Amount">
                €{invoceDetail.lineExtensionAmount}
              </Descriptions.Item>
              <Descriptions.Item label="Tax Exclusive Amount">
                €{invoceDetail.taxExclusiveAmount}
              </Descriptions.Item>
              <Descriptions.Item label="Tax Inclusive Amount">
                <Text strong style={{ color: "#1890ff" }}>
                  €{invoceDetail.taxInclusiveAmount}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Payable Amount">
                <Text strong style={{ color: "#52c41a" }}>
                  €{invoceDetail.payableAmount}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title="Payment Status">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Status: </Text>
                  <Tag
                    color={getPaymentStatusColor(
                      invoceDetail.paymentDetails?.paymentStatus
                    )}
                  >
                    {invoceDetail.paymentDetails?.paymentStatus?.toUpperCase() ||
                      "UNKNOWN"}
                  </Tag>
                </div>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Total Amount">
                    €{invoceDetail.paymentDetails?.totalAmount || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label="Paid Amount">
                    €{invoceDetail.paymentDetails?.paidAmount || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label="Remaining Amount">
                    <Text strong style={{ color: "#f5222d" }}>
                      €{invoceDetail.paymentDetails?.remainingAmount || 0}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Additional Information" style={{ marginTop: "24px" }}>
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
          <Descriptions.Item label="Document Type">
            {invoceDetail.documentType}
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            {invoceDetail.type}
          </Descriptions.Item>
          <Descriptions.Item label="Source">
            {invoceDetail.source}
          </Descriptions.Item>
          <Descriptions.Item label="Currency">
            {invoceDetail.currency}
          </Descriptions.Item>
          <Descriptions.Item label="Send via PEPPOL">
            <Tag color={invoceDetail.sendViaPeppol ? "green" : "red"}>
              {invoceDetail.sendViaPeppol ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {formatDate(invoceDetail.createdTime)}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {formatDate(invoceDetail.lastUpdatedTime)}
          </Descriptions.Item>
          {invoceDetail.deliveryDate && (
            <Descriptions.Item label="Delivery Date">
              {formatDate(invoceDetail.deliveryDate)}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}
