/* eslint-disable jsx-a11y/alt-text */
import { getAmountDetail } from '@logic/costCalculator';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';

const PdfToDownload = (props: any) => {
  const { compData } = props;
  const { labels, totalAmount, pdfData } = compData;

  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: '30px' }}>
          <View>
            <Image
              src={'/assets/images/ambuja-logo.png'}
              style={{
                width: '100px',
                height: '50px',
              }}
            />
            <Text style={{ textAlign: 'center', marginBottom: '20px' }}>{labels?.pdfLabels?.pdfHeading}</Text>
          </View>
          <View>
            <View style={{ margin: 0, padding: 0 }}>
              <View
                style={{
                  padding: '20px 30px 20px 30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #dedede',
                  marginBottom: '18px',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: '18px', color: '#333', flex: '0 0 38%', fontWeight: 600 }}>
                  {labels?.pdfLabels?.pdfMaterialLabel}
                </Text>

                <Text
                  style={{ fontSize: '18px', color: '#333', flex: '0 0 38%', fontWeight: 600, textAlign: 'center' }}
                >
                  {labels?.pdfLabels?.pdfQuantityLabel}
                </Text>
                <Text style={{ fontSize: '18px', color: '#333', flex: '0 0 38%', fontWeight: 600, textAlign: 'right' }}>
                  {labels?.pdfLabels?.pdfPricePerUnitLabel}
                </Text>
              </View>
              <View>
                {pdfData?.map((data: any, index: number) => (
                  <Fragment key={`${data?.label + index}`}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #dedede',
                        marginBottom: '15px',
                        padding: '0px 30px 15px 30px',
                        width: '100%',
                        flexDirection: 'row',
                      }}
                    >
                      <Text style={{ fontSize: '14px', color: '#666', flex: '0 0 38%' }}>{data?.label}</Text>
                      <Text style={{ fontSize: '14px', color: '#666', flex: '0 0 38%', textAlign: 'center' }}>
                        {data?.qty}
                      </Text>{' '}
                      <Text style={{ fontSize: '14px', color: '#666', flex: '0 0 38%', textAlign: 'right' }}>
                        {data?.price || 0}
                      </Text>
                    </View>
                  </Fragment>
                ))}
              </View>
              <View
                style={{
                  display: 'flex',
                  marginBottom: '15px',
                  padding: '0px 30px 15px 30px',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: '18px', flex: '0 0 76%' }}>
                  {labels?.pdfLabels?.pdfTotalCostLabel}
                </Text>
                <Text style={{ fontWeight: 600, fontSize: '18px', textAlign: 'right', flex: '0 0 38%' }}>
                  {getAmountDetail(totalAmount || 0)?.value} {getAmountDetail(totalAmount || 0)?.type}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfToDownload;
