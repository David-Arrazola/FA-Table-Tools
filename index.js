/**
 * A wizard can cast a spell if they have the spell prepared.
 * They can also cast it from a scroll even if it is not prepared.
 * @param {boolean} isSpellPrepared - whether the spell is prepared
 * @param {boolean} hasScroll - whether the wizard has a scroll of the spell
 * @returns {boolean} whether the wizard can cast the spell
 */
function canCastSpell(isSpellPrepared, hasScroll) {
  if (isSpellPrepared === true || hasScroll === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * A creature is hidden from an observer if it is actively hiding
 * or if the observer is not aware of it.
 * @param {boolean} hiding - whether the creature is actively hiding
 * @param {boolean} aware - whether the observer is aware of the creature
 * @returns {boolean} whether the creature is hidden from the observer
 */
function isHidden(hiding, aware) {
  if (hiding === true || aware === false) {
    return true;
  } else {
    return false;
  }
}

/**
 * A strike hits if the attack value is greater than or equal
 * to the target's armor class (AC).
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @returns {boolean} whether the strike hits
 */
function doesStrikeHit(attack, ac) {
  if (attack >= ac) {
    return true;
  } else {
    return false;
  }
}

/**
 * A strike is a critical hit if the attack value is at least
 * 10 greater than the target's armor class (AC).
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @returns {boolean} whether the strike is a critical hit
 */
function doesStrikeCrit(attack, ac) {
  if (attack - ac >= 10) {
    return true;
  } else {
    return false;
  }
}

/**
 * A creature can restore hit points (HP) by healing,
 * but its total HP cannot exceed its maximum HP.
 * @param {number} maxHp - maximum hit points
 * @param {number} currentHp - current hit points
 * @param {number} healAmount - amount to heal
 * @returns {number} total hit points after healing
 */
function heal(maxHp, currentHp, healAmount) {
  let totalHP = currentHp + healAmount;

  if (totalHP > maxHp) {
    totalHP = maxHp;
  }

  return totalHP;
}

/**
 * When a character uses a skill they have proficiency in,
 * they get to add a bonus to their attempt.
 *
 * | Rank       | Bonus     |
 * | ---        | ---       |
 * | untrained  | 0         |
 * | trained    | level + 2 |
 * | expert     | level + 4 |
 * | master     | level + 6 |
 * | legendary  | level + 8 |
 *
 * @param {number} level - level of the character
 * @param {string} rank - character's proficiency rank
 * @returns {number} the character's proficiency bonus
 */
function getProficiencyBonus(level, rank) {
  let bonus;

  switch (rank) {
    case `untrained`:
      bonus = 0;
      break;
    case `trained`:
      bonus = level + 2;
      break;
    case `expert`:
      bonus = level + 4;
      break;
    case `master`:
      bonus = level + 6;
      break;
    case `legendary`:
      bonus = level + 8;
      break;
  }
  return bonus;
}

/**
 * A creature can get a bonus to its armor class (AC) by taking cover.
 * If the creature is behind an obstacle, it gets a +2 bonus to its AC,
 * unless the creature is actively taking cover, in which case it gets
 * a +4 bonus to its AC.
 * A creature that is not behind an obstacle gets no bonus to its AC.
 * @param {boolean} behindObstacle - whether the creature is behind an obstacle
 * @param {boolean} takingCover - whether the creature is actively taking cover
 * @returns {number} the cover bonus to AC
 */
function getCoverBonus(behindObstacle, takingCover) {
  let coverBonus;

  if (behindObstacle === false) {
    coverBonus = 0;
  } else if (behindObstacle === true && takingCover === false) {
    coverBonus = 2;
  } else {
    coverBonus = 4;
  }

  return coverBonus;
}

/**
 * A creature's current hit points (HP) is reduced by taking damage.
 * If the damage taken is greater than or equal to double its maximum
 * HP, the creature dies instantly.
 * A creature's HP cannot go below 0 unless it is dead.
 * @param {number} maxHp - maximum hit points
 * @param {number} currentHp - current hit points
 * @param {number} damage - damage taken
 * @returns {number} -1 if the creature dies instantly
 * @returns {number} 0 if the creature's HP drops to 0 or below
 * @returns {number} the creature's remaining HP after taking damage
 */
function getRemainingHp(maxHp, currentHp, damage) {
  let remainingHp = currentHp - damage;
  const doubleMaxHp = maxHp * 2;

  if (damage >= doubleMaxHp) {
    remainingHp = -1;
  } else if (remainingHp <= 0) {
    remainingHp = 0;
  }
  return remainingHp;
}

/**
 * All creatures can see in bright light.
 * Creatures with low-light vision can also see in dim light.
 * Creatures with darkvision can see in all light conditions.
 * @param {string} light - light condition: "bright", "dim", or "dark"
 * @param {string} vision - vision type: "average", "low-light", or "dark"
 * @returns {boolean} whether the creature can see
 */
function canSee(light, vision) {
  let canSee = false;

  if (light === `bright`) {
    canSee = true;
  } else if (light === `dim`) {
    if (vision === `low-light` || vision === `dark`) {
      canSee = true;
    }
  } else {
    if (vision === `dark`) {
      canSee = true;
    }
  }
  return canSee;
}

/**
 * A strike deals damage if it hits, unless the strike is a critical hit,
 * in which case it deals double damage.
 * If the strike does not hit, it deals 0 damage.
 * Hint: you can use the functions you wrote above :)
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @param {number} damage - damage on a normal hit
 * @returns {number} damage dealt by the strike
 */
function getStrikeDamage(attack, ac, damage) {
  const didStrikeHit = doesStrikeHit(attack, ac);
  let strikeDamage = 0;

  if (didStrikeHit === true) {
    let isStrikeCrit = doesStrikeCrit(attack, ac);

    isStrikeCrit === true
      ? (strikeDamage = damage * 2)
      : (strikeDamage = damage);
  }

  return strikeDamage;
}
