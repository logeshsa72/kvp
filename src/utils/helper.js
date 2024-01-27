

export function generateSubscriptionCode(length = 6) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function findDateInRange(fromDate, toDate, checkDate) {
  if ((fromDate <= checkDate) && (checkDate <= toDate)) {
    return true
  }
  return false;
}

export function exclude(user, keys) {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export async function base64Tobuffer(base64) {
  const response = await fetch(base64);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer
}

export function getDateTimeRange(date) {
  let startTime = new Date(date);
  startTime.setHours(0, 0, 0, 0);
  let endTime = new Date(date);
  endTime.setHours(23, 59, 59, 99);
  return { startTime, endTime };
}


export function generateOrderProductID() {
  // Generate a random UUID
  const uuid = generateUUID();

  // Get the current timestamp
  const timestamp = Date.now().toString();

  // Concatenate the timestamp and unique ID
  const orderProductID = `${timestamp}_${uuid}`;

  return orderProductID;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function substract(num1, num2) {
  let n1 = parseFloat(num1) * 1000;
  let n2 = parseFloat(num2) * 1000;
  let result = (n1 - n2) / 1000
  return result;
}

export const updateStockItems = async (tx, poType, inwardOrReturn, items) => {
  let promises = []
  if (poType.includes("Yarn")) {
    promises = items.map(async (item) => await createOrUpdateYarnStock(tx, item, poType, inwardOrReturn))
  }else if(poType.includes("Fabric")){
    promises = items.map(async (item) => await createOrUpdateFabricStock(tx, item, poType, inwardOrReturn))
  }else if(poType.includes("Accessory")){
    promises = items.map(async (item) => await createOrUpdateAccessoryStock(tx, item, poType, inwardOrReturn))
  }
  return Promise.all(promises);
}

export const createOrUpdateYarnStock = async (tx, item, poType, inwardOrReturn) => {
  let po = await tx.po.findUnique({
    where: {
      id: parseInt(item.poNo)
    }
  })
  let poItem = po.poItems.find(it => it.poItemId === item.poItemId)
  let stockItem = await tx.stock.findFirst({
    where: {
      itemType: poType,
      itemDetails: {
        equals: {
          yarnId: poItem.yarnId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
        }
      }
    }
  })
  let data;
  if (stockItem) {
    let updatedQty = inwardOrReturn.includes("Inward")
      ?
      (parseFloat(stockItem.qty) + parseFloat(item.inwardQty))
      :
      (substract(parseFloat(stockItem.qty), parseFloat(item.returnQty)))
    data = await tx.stock.update({
      where: {
        id: parseInt(stockItem.id)
      },
      data: {
        qty: updatedQty
      }
    })
  } else {
    let newQty = inwardOrReturn.includes("Inward")
      ?
      parseFloat(item.inwardQty)
      :
      (parseFloat(item.returnQty))
    data = await tx.stock.create({
      data: {
        itemType: poType,
        itemDetails: {
          yarnId: poItem.yarnId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
        },
        qty: newQty
      }
    })
  }
  return data;
}

export const createOrUpdateFabricStock = async (tx, item, poType, inwardOrReturn) => {
  let po = await tx.po.findUnique({
    where: {
      id: parseInt(item.poNo)
    }
  })
  let poItem = po.poItems.find(it => it.poItemId === item.poItemId)
  let stockItem = await tx.stock.findFirst({
    where: {
      itemType: poType,
      itemDetails: {
        equals: {
          fabricId: poItem.fabricId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
          fDiaId: poItem.fDiaId,
          kDiaId: poItem.kDiaId,
          gaugeId: poItem.gaugeId,
          designId: poItem.designId,
          gsmId: poItem.gsmId
        }
      }
    }
  })
  let data;
  if (stockItem) {
    let updatedQty = inwardOrReturn.includes("Inward")
      ?
      (parseFloat(stockItem.qty) + parseFloat(item.inwardQty))
      :
      (substract(parseFloat(stockItem.qty), parseFloat(item.returnQty)))
    data = await tx.stock.update({
      where: {
        id: parseInt(stockItem.id)
      },
      data: {
        qty: updatedQty
      }
    })
  } else {
    let newQty = inwardOrReturn.includes("Inward")
      ?
      parseFloat(item.inwardQty)
      :
      (parseFloat(item.returnQty))
    data = await tx.stock.create({
      data: {
        itemType: poType,
        itemDetails: {
          fabricId: poItem.fabricId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
          fDiaId: poItem.fDiaId,
          kDiaId: poItem.kDiaId,
          gaugeId: poItem.gaugeId,
          designId: poItem.designId,
          gsmId: poItem.gsmId
        },
        qty: newQty
      }
    })
  }
  return data;
}

export const createOrUpdateAccessoryStock = async (tx, item, poType, inwardOrReturn) => {
  let po = await tx.po.findUnique({
    where: {
      id: parseInt(item.poNo)
    }
  })
  let poItem = po.poItems.find(it => it.poItemId === item.poItemId)
  let stockItem = await tx.stock.findFirst({
    where: {
      itemType: poType,
      itemDetails: {
        equals: {
          accessoryId: poItem.accessoryId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
          sizeId: poItem.sizeId
        }
      }
    }
  })
  let data;
  if (stockItem) {
    let updatedQty = inwardOrReturn.includes("Inward")
      ?
      (parseFloat(stockItem.qty) + parseFloat(item.inwardQty))
      :
      (substract(parseFloat(stockItem.qty), parseFloat(item.returnQty)))
    data = await tx.stock.update({
      where: {
        id: parseInt(stockItem.id)
      },
      data: {
        qty: updatedQty
      }
    })
  } else {
    let newQty = inwardOrReturn.includes("Inward")
      ?
      parseFloat(item.inwardQty)
      :
      (parseFloat(item.returnQty))
    data = await tx.stock.create({
      data: {
        itemType: poType,
        itemDetails: {
          accessoryId: poItem.accessoryId,
          colorId: poItem.colorId,
          uomId: poItem.uomId,
          sizeId: poItem.sizeId
        },
        qty: newQty
      }
    })
  }
  return data;
}
