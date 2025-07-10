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
import { useTranslation } from "react-i18next";
import { getInvoiceById } from "../../features/invoice/invoiceSlice";
import type { AppDispatch, RootState } from "../../store";
import { format } from "date-fns";

const { Title, Text } = Typography;

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

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
        title={t("invoiceNotFound")}
        subTitle={t("invoiceNotFoundDesc")}
        extra={
          <Button type="default" onClick={handleGoBack}>
            {t("goBack")}
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
              {t("back")}
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              {t("invoiceDetails")}
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
            <span>{t("invoiceSummary")}</span>
          </Space>
        }
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">{t("invoiceNumber")}</Text>
            <div>
              <Text strong style={{ fontSize: "16px" }}>
                {invoceDetail.invoiceNumber}
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">{t("totalAmount")}</Text>
            <div>
              <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                €{invoceDetail.taxInclusiveAmount}
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">{t("issueDate")}</Text>
            <div>
              <Text strong>{formatDate(invoceDetail.issueDate)}</Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary">{t("dueDate")}</Text>
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
                <span>{t("supplierInformation")}</span>
              </Space>
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t("companyName")}>
                <Text strong>{invoceDetail.supplierName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={t("vatNumber")}>
                {invoceDetail.supplierVat}
              </Descriptions.Item>
              <Descriptions.Item label={t("country")}>
                {invoceDetail.supplierCountryCode}
              </Descriptions.Item>
              <Descriptions.Item label={t("endpoint")}>
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
                <span>{t("customerInformation")}</span>
              </Space>
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t("customerName")}>
                <Text strong>{invoceDetail.customerName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={t("vatNumber")}>
                {invoceDetail.customerVat}
              </Descriptions.Item>
              <Descriptions.Item label={t("country")}>
                {invoceDetail.customerCountryCode}
              </Descriptions.Item>
              <Descriptions.Item label={t("endpoint")}>
                {invoceDetail.customerEndpoint || t("notAvailable")}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DollarOutlined />
            <span>{t("financialDetails")}</span>
          </Space>
        }
        style={{ marginTop: "24px" }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t("lineExtensionAmount")}>
                €{invoceDetail.lineExtensionAmount}
              </Descriptions.Item>
              <Descriptions.Item label={t("taxExclusiveAmount")}>
                €{invoceDetail.taxExclusiveAmount}
              </Descriptions.Item>
              <Descriptions.Item label={t("taxInclusiveAmount")}>
                <Text strong style={{ color: "#1890ff" }}>
                  €{invoceDetail.taxInclusiveAmount}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={t("payableAmount")}>
                <Text strong style={{ color: "#52c41a" }}>
                  €{invoceDetail.payableAmount}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={t("paymentStatus")}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">{t("status")}: </Text>
                  <Tag
                    color={getPaymentStatusColor(
                      invoceDetail.paymentDetails?.paymentStatus
                    )}
                  >
                    {invoceDetail.paymentDetails?.paymentStatus?.toUpperCase() ||
                      t("unknown")}
                  </Tag>
                </div>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label={t("totalAmount")}>
                    €{invoceDetail.paymentDetails?.totalAmount || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("paidAmount")}>
                    €{invoceDetail.paymentDetails?.paidAmount || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("remainingAmount")}>
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

      <Card title={t("additionalInformation")} style={{ marginTop: "24px" }}>
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
          <Descriptions.Item label={t("documentType")}>
            {invoceDetail.documentType}
          </Descriptions.Item>
          <Descriptions.Item label={t("type")}>
            {invoceDetail.type}
          </Descriptions.Item>
          <Descriptions.Item label={t("source")}>
            {invoceDetail.source}
          </Descriptions.Item>
          <Descriptions.Item label={t("currency")}>
            {invoceDetail.currency}
          </Descriptions.Item>
          <Descriptions.Item label={t("sendViaPeppol")}>
            <Tag color={invoceDetail.sendViaPeppol ? "green" : "red"}>
              {invoceDetail.sendViaPeppol ? t("yes") : t("no")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("createdDate")}>
            {formatDate(invoceDetail.createdTime)}
          </Descriptions.Item>
          <Descriptions.Item label={t("lastUpdated")}>
            {formatDate(invoceDetail.lastUpdatedTime)}
          </Descriptions.Item>
          {invoceDetail.deliveryDate && (
            <Descriptions.Item label={t("deliveryDate")}>
              {formatDate(invoceDetail.deliveryDate)}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}
