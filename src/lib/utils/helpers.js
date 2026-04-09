import { get } from "svelte/store"
import { hoveredItems, data } from "$lib/stores"

export function calcIsFlipped(endAngle) {
  return endAngle > 90 * Math.PI/180
}

export function cutArc(d, flip=false) {
  let newArc = d.split('A').splice(0, 2).join('A')

  if (flip) {
    const startLoc = /M(.*?)A/
    const middleLoc = /A(.*?)0,0,1/
    const endLoc = /0,0,1,(.*?)$/

    const newStart = endLoc.exec(newArc)[1]
    const newEnd = startLoc.exec(newArc)[1]
    const middleSec = middleLoc.exec(newArc)[1]

    newArc = `M${newStart}A${middleSec}0,0,0,${newEnd}`
  }

  return newArc
}

export function normalizeString(str) {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, "_") // Replace white spaces with underscores
}

export function runSimulationTicks(simulation, tickCount) {
  return new Promise(resolve => {
    let ticks = 0;

    function step() {
      if (ticks < tickCount) {
        simulation.tick()
        ticks++

        // Schedule the next tick asynchronously
        requestAnimationFrame(step) // Non-blocking
      } 
      else {
        resolve() 
      }
    }

    step()
  })
}

export function getMiddleAngle(thetaInit, thetaEnd) {
  // Normalize both angles to the range [0, 2*PI)
  const TWO_PI = 2 * Math.PI
  thetaInit = ((thetaInit % TWO_PI) + TWO_PI) % TWO_PI
  thetaEnd = ((thetaEnd % TWO_PI) + TWO_PI) % TWO_PI

  // Calculate the difference and ensure we take the shortest path
  let diff = thetaEnd - thetaInit;

  // If the difference is greater than Pi, it means the shortest path goes around the circle
  if (diff > Math.PI) {
    diff -= TWO_PI;
  } else if (diff < -Math.PI) {
    diff += TWO_PI;
  }

  // Now, calculate the middle angle
  const middleAngle = thetaInit + diff / 2;

  // Ensure the middle angle is normalized to [0, 2*PI)
  return ((middleAngle % TWO_PI) + TWO_PI) % TWO_PI;
}

export function getNodeById(segment, id) {
  let group

  switch (segment) {
    case 'macro': 
      group = 'macro'
      break
    case 'territory': 
      group = 'territories'
      break
    case 'territoryTier': 
      group = 'territoryTiers'
      break
    case 'brand': 
      group = 'brands'
      break
    case 'product': 
      group = 'products'
      break
  }

  return get(data)[group].find(d => d.id === id) || null
}

export function rad2deg(radian) {
  return radian * (180 / Math.PI);
}

export function getImageRoute(imageName) {
  return imageName ? '/api/image/' + normalizeString(imageName) : false
}

function normalizeAngle(angle) {
  // Normalize to the range [0, 2π)
  return ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
}

export function calculateMinOffset(currentAngle, targetAngle) {
  // Normalize both angles
  currentAngle = normalizeAngle(currentAngle);
  targetAngle = normalizeAngle(targetAngle);
  
  // Calculate the difference
  let offset = targetAngle - currentAngle;

  // Normalize the offset to the range of -π to π
  if (offset > Math.PI) {
      offset -= 2 * Math.PI;
  } else if (offset < -Math.PI) {
      offset += 2 * Math.PI;
  }

  return offset;
}